import { client } from "../libs/client.js"
import Link from "next/link"

// SSG
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" })
  return {
    props: {
      blog: data.contents,
    }
  }
}

export default function Home({ blog }) {
  console.log(blog)
  return (
    <div>
      {blog.map((b) => (
        <div key={b.id} className="list-none w-9/12 m-auto">
          <Link href={`blog/${b.id}`}>
            <p className="mt-8 bg-gray-200 p-5 rounded duration-300 hover:bg-sky-600">{b.title}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}
