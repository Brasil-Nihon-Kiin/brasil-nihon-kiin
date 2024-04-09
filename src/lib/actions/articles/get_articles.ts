import { prisma, toJSON } from "@utils"

export async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { updatedAt: "desc" },
    })

    return toJSON(articles)
  } catch (e) {
    console.error(e)
  }
}
