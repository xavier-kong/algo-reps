import fs, { readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export function getTopics() {
  return readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dir => dir.name);
}

export function getSlugsForTopic(topic: string) {
  const topicDirectory = join(postsDirectory, topic);
  return fs.readdirSync(topicDirectory);
}

export function getPostSlugs() {
  readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dir => console.log('isdir', dir));
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = [], topic: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const topicPath = join(postsDirectory, topic);
  const fullPath = join(topicPath, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (field === 'topic') {
      items[field] = topic
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const topics = getTopics();

  const postData = [];

  topics.forEach(topic => {
    const slugs = getSlugsForTopic(topic);
    slugs.forEach(slug => {
      const post = getPostBySlug(slug, fields, topic);
      postData.push(post);
    })
  })

  // add ordering in the future based on proposed learning order

  /*const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts*/

  return postData;
}
