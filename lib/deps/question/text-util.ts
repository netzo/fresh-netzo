export interface TextSpecificity {
	exactWordMatches: number
	exactWordMatchesInSequence: number
	continuesWordMatches: number
}

export interface TextSearchOptions<T> {
	transformer?(item: T): string
	matchCase?: boolean
}

export interface TextRange {
	start: number
	end: number
}

export interface TextSearchResult<T> {
	item: T
	itemAsString: string
	matches: TextRange[]
	specificity: TextSpecificity
	specificityScore: number
}

/**
 * Searches with the given search string for items that matches it. It sorts
 * the returned items where the most specific item is first and the least
 * specific is last. If an item does not have any matching qualities it is
 * left out.
 *
 * @param searchString The free text string that is searched for.
 * @param items All items that the search is within.
 * @returns The items that matches the search string in a order of
 * most specific to least specific.
 */
export function textSearch<T>(searchString: string, items: T[], options?: TextSearchOptions<T>): TextSearchResult<T>[] {
	const searchTerms = (options?.matchCase ?? false)
		? searchString.trim().split(/ +/g)
		: searchString.trim().toLowerCase().split(/ +/g)
	const specificityList: TextSearchResult<T>[] = []

	for (const item of items) {
		const itemAsString = options?.transformer?.(item) ?? '' + item
		const itemAsStringSearchable = (options?.matchCase ?? false)
			? itemAsString
			: itemAsString.toLowerCase()
		const itemParts = itemAsStringSearchable.split(/ +/g)
		const specificity = {
			exactWordMatches: 0,
			exactWordMatchesInSequence: 0,
			continuesWordMatches: 0,
		}
		const matches = []

		let lastSequenceMatch = -1
		for (let i = 0; i < searchTerms.length; i++) {
			if (lastSequenceMatch === -1) {
				lastSequenceMatch = itemParts.findIndex((part) => part === searchTerms[i])
			} else {
				if (itemParts[lastSequenceMatch + 1] === searchTerms[i]) {
					specificity.exactWordMatchesInSequence++
					lastSequenceMatch++
				} else {
					const start = itemAsStringSearchable.indexOf(searchTerms[i], itemParts.slice(0, lastSequenceMatch).join(' ').length)
					const end = itemAsStringSearchable.indexOf(searchTerms[i], itemParts.slice(0, i).join(' ').length)
					matches.push({ start, end: end + searchTerms[i].length })
					lastSequenceMatch = -1
				}
			}
			const itemPartIndex = itemParts.findIndex((part) => part === searchTerms[i])
			if (itemPartIndex !== -1) {
				specificity.exactWordMatches++
				const start = itemAsStringSearchable.indexOf(searchTerms[i], itemParts.slice(0, i).join(' ').length)
				matches.push({ start, end: start + searchTerms[i].length })
			}
			const interWordMatches = itemParts.map((part, index) => {
				const matchIndex = part.indexOf(searchTerms[i])
				if (matchIndex !== -1) return matchIndex + itemAsStringSearchable.indexOf(part, itemParts.slice(0, index).join(' ').length)
				return -1
			}).filter(res => res > -1)
			matches.push(...interWordMatches.map(index => ({ start: index, end: index + searchTerms[i].length })))

			specificity.continuesWordMatches += interWordMatches.length
		}
		
		const continuousMatches: TextRange[] = []
		for (const match of matches) {
			const matchIndex = continuousMatches.findIndex(
				m => match.start >= m.start && match.start <= m.end || match.end <= m.start
			)
			if (matchIndex === -1) {
				continuousMatches.push(match)
				continue
			}
			continuousMatches[matchIndex] = {
				start: continuousMatches[matchIndex].start < match.start ? continuousMatches[matchIndex].start : match.start,
				end: continuousMatches[matchIndex].end < match.end ? match.end : continuousMatches[matchIndex].end,
			}
		}

		continuousMatches.sort((a, b) => a.start - b.start)

		specificityList.push({
			specificity,
			item,
			itemAsString,
			matches: continuousMatches,
			specificityScore:
				0b100 * specificity.exactWordMatchesInSequence +
				0b010 * specificity.exactWordMatches +
				0b001 * specificity.continuesWordMatches,
		})
	}
	return specificityList
}
