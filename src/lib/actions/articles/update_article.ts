"use server"

import { prisma, standardNanoid, toJSON } from "@utils"

import { Nanoid } from "@types"

export async function updateArticle(
  id: Nanoid,
  title: string,
  content: string,
  isDraft: boolean = true,
  thumbnailLink?: string | null | undefined
) {
  try {
    const article = await prisma.article.update({
      where: {
        nanoid: id,
      },
      data: {
        nanoid: standardNanoid(),
        title,
        content,
        thumbnailLink,
        isDraft,
      },
    })

    return toJSON(article)
  } catch (e) {
    console.error(e)
  }
}
