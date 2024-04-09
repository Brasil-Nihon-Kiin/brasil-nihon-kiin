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
    <article className="prose">
      <h1 className="mb-0">{article.title}</h1>
      <ArticleAuthor
        author={article.author}
        textColor="text-neutral-800"
      />
      <div
        className="mt-8"
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      ></div>
    </article>
  )
}

export function ArticleCard({ article }: ArticleProps) {
console.log(article)
  const clippedContent = clipString(article.abstract ?? "")

  return (
    <Link href={`/artigos/${article.nanoid}`}>
      <div className="card bg-neutral shadow-xl h-max">
        <div className="card-body gap-4 px-7 py-6">
          <h2 className="card-title text-neutral-100">
            {article.title}
          </h2>
          <ArticleDate date={toDate(article.updatedAt)} />
          <ArticleAuthor author={article.author} />
          <p className="text-neutral-200 text-sm">
            {clippedContent}
          </p>
        </div>
      </div>
    </Link>
  )
}

type ArticleDateProps = {
  date: Date
}

function ArticleDate({ date }: ArticleDateProps) {
  return (
    <p className="text-neutral-300 text-xs">
      {date.toLocaleDateString()}{" "}
      {date.toLocaleTimeString()}
    </p>
  )
}

type ArticleAuthorProps = {
  author: User
  textColor?: string
}

function ArticleAuthor({
  author,
  textColor = "text-neutral-100",
}: ArticleAuthorProps) {
  const router = useRouter()

  return (
    <div
      className="flex"
      onClick={() => router.push(`/usuarios/${author.id}`)}
    >
      <h3 className={`${textColor}`}>
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
