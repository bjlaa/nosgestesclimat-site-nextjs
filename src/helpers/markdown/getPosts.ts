import { Post } from '@/types/posts'

async function getPosts(folderPath: string): Promise<Post[]> {
  // const realFolderPath = path.join(process.cwd(), folderPath)
  // const files = fs.readdirSync(realFolderPath)
  console.log('get posts', folderPath)
  return Promise.resolve([])
  // return files.map((file) => {
  //   const source = fs.readFileSync(realFolderPath + file, 'utf-8')
  //   const matterResult = matter(source)
  //   return {
  //     slug: file.replace('.mdx', ''),
  //     data: matterResult.data,
  //     content: matterResult.content,
  //   }
  // })
}

export default getPosts
