import { Article, User } from "@prisma/client"

export type ArticleWithCreator = Article & {
  author: User
}
