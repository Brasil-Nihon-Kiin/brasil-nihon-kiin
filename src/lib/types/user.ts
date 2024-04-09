import { Article, User } from "@prisma/client"

export type UserWithArticles = User & {
  articles: Article[]
}
