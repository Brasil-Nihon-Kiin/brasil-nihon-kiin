"use server"

import { prisma, toJSON } from "@utils"

export async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true },
    })

    return toJSON(articles)
  } catch (e) {
    console.error(e)
  }
}
