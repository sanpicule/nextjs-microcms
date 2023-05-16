import { client } from "@/libs/client"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import Link from "next/link"

// SSG
export const getStaticProps = async (context) => {
  console.log(context)
  // idの取得
  const id = context.params.id
  const data = await client.get({
    endpoint: 'blog',
    contentId: id
  })
  return {
    props: {
      blog: data
    }
  }
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' })
  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return {
    paths,
    fallback: false
  }
}

export default function BlogId({ blog }) {
  return (
    <main className="m-auto w-9/12 p-10 bg-green-400 mt-20">
      <h1 className="bg-white p-2">
        タイトル：{blog.title}
      </h1>
      <div   
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        className="mt-10 p-3"
      />
      <p className="text-end">
       {format(new Date(blog.publishedAt), 'yyyy-MM-dd', { locale: ja })}
      </p>
      <Link href={'/'}>
        <button className="bg-gray-200 px-3 rounded text-xs h-7">Back</button>
      </Link>
    </main>
  )
}

