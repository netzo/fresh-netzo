/**
 * Join classes without de-duplicating to ensure override order is maintained.
 * @param groups - Array of classes to join
 * @returns Deduplicated and joined classes
 */
export const n = (groups: (string | undefined)[]): string => {
  const classes = groups.reduce<string[]>((acc, group) => {
    const groupClasses = group?.split?.(' ') ?? []
    return [...acc, ...groupClasses]
  }, [])
  return classes.filter(Boolean).join(' ')
}
