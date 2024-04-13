import { User } from "@prisma/client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { clipString, toDate } from "@utils"

import { ArticleWithCreator } from "@types"
import { UserAvatar } from "../exports"

type ArticleProps = {
  article: ArticleWithCreator
}

export function Article({ article }: ArticleProps) {
  return (
    <article className="prose max-w-xl font-medium">
      <h1 className="mb-0">{article.title}</h1>
      <ArticleAuthor
        author={article.author}
        textColor="text-neutral-800"
      />
      <div
        id="conteudo-artigo"
        className="mt-8"
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      ></div>
    </article>
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
          <ArticleDate date={toDate(article.updatedAt)} />
          <ArticleAuthor author={article.author} />
          <p className="text-neutral-200 text-sm">
            {/* {clippedContent} */}
            wwwwwwwwwwwwwwwwwwwwwwwwwwwwlajdf
            alkafjsdlkfjaljdslkfjadlskjf lasjdf lasdjfla
            sdflja sdlkfjalsjf dlakj dflkaj sldfj
            lajflkasjdf lkjaslfd
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
      {date.toLocaleDateString("pt-BR")}{" "}
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
      className="flex gap-2 items-center"
      onClick={() => router.push(`/usuarios/${author.id}`)}
    >
      <UserAvatar user={author} />
      <h3 className={`${textColor}`}>
        {author.firstName} {author.lastName}
      </h3>
    </div>
  )
}

type ArticlesListProps = {
  articles: ArticleWithCreator[]
  totalCols?: number
  width?: string
}

export function ArticlesList({
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
