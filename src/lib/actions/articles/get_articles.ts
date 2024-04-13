"use server"

import { NextResponse } from "next/server"

import { prisma, toJSON } from "@utils"

import { Nanoid } from "@types"

export async function getArticles(totalArticles?: number) {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { updatedAt: "desc" },
      take: totalArticles,
      include: { author: true },
    })

    return toJSON(articles)
  } catch (e) {
    console.error(e)
  }
}

export async function getArticle(nid: Nanoid) {
  try {
    const article = await prisma.article.findUnique({
      where: { nanoid: nid },
      include: { author: true },
    })

    return toJSON(article)
  } catch (e) {
    console.error(e)
  }
}
