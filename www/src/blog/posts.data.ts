import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import type { MarkdownRenderer } from 'vitepress'
import { createMarkdownRenderer } from 'vitepress'

let md: MarkdownRenderer
const dirname = path.dirname(fileURLToPath(import.meta.url))
const postDir = path.resolve(dirname, './posts')

export interface Post {
  group: string
  title: string
  description?: string
  image: string
  favicon?: string
  href: string
  date: {
    time: number
    string: string
  }
  author: {
    name: string
    avatar: string
    href: string
  }[]
  avatar: string
  twitter: string
  data?: Record<string, any>
  excerpt: string | undefined
  content: string
}

interface PostWithData extends Post {
  data: Record<string, any>
}

declare const data: Post[]
export { data }

async function load(): Promise<Post[]>
async function load(asFeed: boolean): Promise<PostWithData[]>
async function load(asFeed = false) {
  md = md || (await createMarkdownRenderer(process.cwd()))
  return fs
    .readdirSync(postDir)
    .map(file => getPost(file, postDir, asFeed))
    .sort((a, b) => b.date.time - a.date.time)
}

export default {
  watch: path.join(postDir, '*.md'),
  load,
}

const cache = new Map()

function getPost(file: string, postDir: string, asFeed = false): Post {
  const fullPath = path.join(postDir, file)
  const timestamp = fs.statSync(fullPath).mtimeMs

  const cached = cache.get(fullPath)
  if (cached && timestamp === cached.timestamp)
    return cached.post

  const src = fs.readFileSync(fullPath, 'utf-8')
  const { content, data, excerpt } = matter(src, { excerpt: true })

  const post: Post = {
    group: data.group,
    title: data.title,
    description: data.description,
    image: data.image,
    href: `/blog/posts/${file.replace(/\.md$/, '.html')}`,
    date: formatDate(data.date),
    author: data.author,
    excerpt: excerpt && md.render(excerpt),
    content,
  }
  if (asFeed) {
    // only attach these when building the RSS feed to avoid bloating the
    // client bundle size
    post.data = data
  }

  cache.set(fullPath, {
    timestamp,
    post,
  })

  return post
}

function formatDate(date: string | Date): Post['date'] {
  if (!(date instanceof Date))
    date = new Date(date)

  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
