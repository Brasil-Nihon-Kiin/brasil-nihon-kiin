import { Article } from "@prisma/client"

type ArticleProps = {
  article: Article
}

function Article({ article }: ArticleProps) {
  return (
    <article>
      <h1>{article.title}</h1>
      <div>{article.content}</div>
    </article>
  )
}

type ArticlesListProps = {
  articles: Article[]
}

export function ArticlesList({
  articles,
}: ArticlesListProps) {
  return articles.map((article, i) => {
    return <Article key={i} article={article} />
  })
}
