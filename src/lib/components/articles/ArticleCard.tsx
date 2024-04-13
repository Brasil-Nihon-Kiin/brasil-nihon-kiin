import { User } from "@prisma/client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { clipString, toDate } from "@utils"

import { ArticleWithCreator } from "@types"

import { UserAvatar } from "../exports"

type ArticleCardDateProps = {
  date: Date
}

export function ArticleCardDate({
  date,
}: ArticleCardDateProps) {
  return (
    <p className="text-neutral-300 text-xs">
      {date.toLocaleDateString("pt-BR")}{" "}
    </p>
  )
}

type ArticleCardAuthorProps = {
  author: User
}

export function ArticleCardAuthor({
  author,
}: ArticleCardAuthorProps) {
  const router = useRouter()

  return (
    <div
      className="flex gap-2 items-center"
      onClick={() => router.push(`/usuarios/${author.id}`)}
    >
      <UserAvatar user={author} />
      <h3 className="text-neutral-100">
        {author.firstName} {author.lastName}
      </h3>
    </div>
  )
}

type ArticleCardProps = {
  article: ArticleWithCreator
  width?: string
}

export function ArticleCard({
  article,
  width,
}: ArticleCardProps) {
  const clippedContent = clipString(article.abstract ?? "")

  return (
    <Link
      href={`/artigos/${article.nanoid}`}
      className={`w-[${width}]`}
    >
      <div className="card bg-neutral shadow-xl h-max">
        <div className="card-body gap-4 px-7 py-6">
          <h2 className="card-title text-neutral-100">
            {article.title}
          </h2>
          <ArticleCardDate
            date={toDate(article.updatedAt)}
          />
          <ArticleCardAuthor author={article.author} />
          <p className="text-neutral-200 text-sm">
            {clippedContent}
          </p>
        </div>
      </div>
    </Link>
  )
}

type ArticlesListProps = {
  articles: ArticleWithCreator[]
  totalCols?: number
  width?: string
}

export function ArticlesCardList({
  articles,
  width,
}: ArticlesListProps) {
  return (
    <section
      className="h-max flex flex-col gap-4"
      style={{ width }}
    >
      {articles.map((article, i) => {
        return <ArticleCard key={i} article={article} />
      })}
    </section>
  )
}
