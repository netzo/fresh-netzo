import path from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Feed } from 'feed'
import postsData from '../../src/blog/posts.data'

const url = 'https://netzo.io'
const dirname = path.dirname(fileURLToPath(import.meta.url))

const feed = new Feed({
  id: url,
  title: 'Netzo Blog',
  description: 'The official blog for Netzo',
  link: url,
  language: 'en',
  image: 'https://netzo.io/images/netzo-symbol-light.png',
  favicon: 'https://netzo.io/favicon.svg',
  copyright: `Copyright © ${new Date().getFullYear()} Netzo`,
})

postsData.load(true).then((posts) => {
  try {
    posts.forEach((post) => {
      const file = path.resolve(dirname, `../dist${post.href}`)
      // FIXME: extract excerpt from rendered html page (markdown files)
      // and pass it to feed.addItem, if it does not exist, throw Error
      // however, the post.excerpt already has parsed content so use instead
      const rendered = readFileSync(file, 'utf-8')
      const content = rendered.match(
      // FIXME: this regex is not working correctly to extract the excerpt
      //  and has been modified from the original from the vuejs.org blog
      // "/<div [^<>]+?class="prose[^<>]+?>([\s\S]*)<\/div><\/div><footer/"
      // see https://github.com/vuejs/blog/blob/master/.vitepress/plugins/gen-feed.plugin.ts
        /<div [^<>]+?class="VPContentDoc [^<>]+?>([\s\S]*)<\/div><\/div><footer/,
      )

      // DISABLED: allow empty content for now (since RegEx is not working)
      // if (!content)
      //   throw new Error(`no content match found for file ${post.href}`)

      feed.addItem({
        ...post,
        title: post.title,
        id: `${url}${post.href}`,
        link: `${url}${post.href}`,
        description: post.description,
        image: post.image?.startsWith('https://')
          ? post.image
          : `https://netzo.io${post.image}`,
        content: content?.[1] ?? post.content, // NOTE: see NOTE above
        author: post.author.map(author => ({
          name: author.name,
          image: author.avatar,
          link: author.href,
        })),
        date: post.data.date,
        published: post.data.date,
        category: post.data.tags.map((tag: string) => ({ name: tag })),
      })
    })
  }
  catch (error) {
    console.error(error)
  }

  writeFileSync(path.resolve(dirname, '../dist/feed.rss'), feed.rss2())
  writeFileSync(path.resolve(dirname, '../dist/feed.json'), feed.json1())
  writeFileSync(path.resolve(dirname, '../dist/feed.atom'), feed.atom1())
})
