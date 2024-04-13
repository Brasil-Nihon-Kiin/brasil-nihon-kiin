import { User } from "@prisma/client"

import { useRouter } from "next/navigation"

import { toDate } from "@utils"

import { ArticleWithCreator } from "@types"

import { UserAvatar } from "../users/exports"

type ArticleDateProps = {
  date: Date
}

export function ArticleDate({ date }: ArticleDateProps) {
  return (
    <h5 className="text-neutral-500 pt-1">
      {date.toLocaleDateString("pt-BR")}{" "}
      {date.toLocaleTimeString("pt-BR")}
    </h5>
  )
}

type ArticleAuthorProps = {
  author: User
}

export function ArticleAuthor({
  author,
}: ArticleAuthorProps) {
  const router = useRouter()

  return (
    <div
      className="flex gap-2 items-center"
      onClick={() => router.push(`/usuarios/${author.id}`)}
    >
      <UserAvatar user={author} size="32px" />
      <h3 className="my-0 pt-0.5">
        {author.firstName} {author.lastName}
      </h3>
    </div>
  )
}

type ArticleProps = {
  article: ArticleWithCreator
}

export function Article({ article }: ArticleProps) {
  return (
    <article className="prose max-w-xl font-medium flex flex-col gap-6">
      <h1 className="mb-0">{article.title}</h1>
      <div className="flex items-center gap-6">
        <ArticleAuthor author={article.author} />
        <ArticleDate date={toDate(article.updatedAt)} />
      </div>
      <div
        id="conteudo-artigo"
        className="mt-4 ml-1"
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      ></div>
    </article>
  )
}
