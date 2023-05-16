import { useState } from "react"
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
  const [isClick, setIsClick] = useState(false)
  return (
    <div className={`min-h-screen ${isClick ? '' : 'bg-black'}`}>
      {!isClick &&
        <div
         className="flex justify-center items-center h-screen"
        >
          <button
            className="text-white bg-black transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 p-2 border border-white-500 duration-500 hover:bg-white hover:text-black"
            onClick={() => setIsClick(true)}
          >
            投稿を見る
          </button>
        </div>
      }
      {isClick &&
        <div className="text-center">
          {blog.map((b) => (
            <div key={b.id} className="list-none w-9/12 m-auto">
              <Link href={`blog/${b.id}`}>
                <p className="mt-8 bg-gray-200 p-5 rounded duration-300 hover:bg-gray-400">{b.title}</p>
              </Link>
            </div>
          ))}
          <button
            onClick={() => setIsClick(false)}
            className="mt-10 border-2 duration-300 rounded px-2 hover:bg-gray-400"
          >
            ホームに戻る
          </button>
        </div>
      }
    </div>
  )
}
