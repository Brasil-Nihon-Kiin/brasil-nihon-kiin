"use server"

import { prisma, standardNanoid, toJSON } from "@utils"

import { Nanoid } from "@types"

export async function postArticle(
  clerkId: Nanoid,
  title: string,
  content: string,
  isDraft: boolean = true,
  thumbnailLink?: string | null | undefined
) {
  try {
    const article = await prisma.user.update({
      where: {
        clerkId,
      },
      data: {
        articles: {
          create: {
            nanoid: standardNanoid(),
            title,
            content,
            thumbnailLink,
            isDraft,
          },
        },
      },
    })

    return toJSON(article)
  } catch (e) {
    console.error(e)
  }
}
