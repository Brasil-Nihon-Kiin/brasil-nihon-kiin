import { Article, User } from "@prisma/client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { clipString, toDate } from "@utils"

import { ArticleWithCreator } from "@types"

type ArticleProps = {
  article: ArticleWithCreator
}

export function Article({ article }: ArticleProps) {
  return (
    <article>
      <h1>{article.title}</h1>
      <div>{article.content}</div>
    </article>
  )
}

export function ArticleCard({ article }: ArticleProps) {
  const clippedContent = clipString(article.content)

  return (
    <Link href={`/articles/${article.nanoid}`}>
      <div className="w-full card bg-neutral shadow-xl h-max">
        <div className="card-body gap-4 px-7 py-6">
          <h2 className="card-title text-neutral-100">
            {article.title}
          </h2>
          <p className="text-neutral-300 text-xs">
            {toDate(article.createdAt).toLocaleDateString()}{" "}
            {toDate(article.createdAt).toLocaleTimeString()}
          </p>
          <ArticleAuthorCard author={article.author} />
          <p className="text-neutral-200 text-sm">
            {clippedContent}
          </p>
        </div>
      </div>
    </Link>
  )
}

type ArticleAuthorProps = {
  author: User
}

function ArticleAuthorCard({ author }: ArticleAuthorProps) {
  const router = useRouter()

  return (
    <div
      className="flex"
      onClick={() => router.push(`/users/${author.id}`)}
    >
      <h3 className=" text-neutral-100">
        {author.firstName} {author.lastName}
      </h3>
    </div>
  )
}

type ArticlesListProps = {
  articles: ArticleWithCreator[]
}

export function ArticlesList({
  articles,
}: ArticlesListProps) {
  return (
    <section className="flex gap-4">
      {articles.map((article, i) => {
        return <ArticleCard key={i} article={article} />
      })}
    </section>
  )
}
