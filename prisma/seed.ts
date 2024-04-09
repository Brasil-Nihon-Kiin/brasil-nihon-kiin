import { Prisma } from "@prisma/client"

import { prisma } from "../src/lib/utils/prisma_utils"

import "../src/lib/utils/array"
import {
  Color,
  calculateElo,
  getGameResult,
} from "../src/lib/utils/elo"
import { toNumber } from "../src/lib/utils/utils"

import { findLastElo } from "../src/lib/actions/games/post_game"

async function deleteAll() {
  try {
    await prisma.article.deleteMany()
    await prisma.game.deleteMany()
    await prisma.user.deleteMany()

    const tableNames = Object.values(Prisma.ModelName)
    for (const tableName of tableNames) {
      await prisma.$queryRawUnsafe(/* sql */ `
        TRUNCATE TABLE "${tableName}"
        RESTART IDENTITY CASCADE
      `)
    }
  } catch (e) {
    console.error(e)
  }
}

async function createUsers() {
  try {
    await prisma.user.createMany({
      data: [
        {
          nanoid: "1",
          clerkId: "psygo",
          email: "philippe@fanaro.com",
          username: "psygo",
          firstName: "Philippe",
          lastName: "Fanaro",
        },
        {
          nanoid: "2",
          clerkId: "renan",
          email: "renan@cruz.com",
          username: "renan",
          firstName: "Renan",
          lastName: "Cruz",
        },
        {
          nanoid: "3",
          clerkId: "riemsdik",
          email: "felipe@riemsdijk.com",
          username: "riemsdik",
          firstName: "Felipe",
          lastName: "Herman van Riemsdijk",
        },
        {
          nanoid: "4",
          clerkId: "celso",
          email: "celso@scaff.com",
          username: "celso",
          firstName: "Celso",
          lastName: "Scaff",
        },
      ],
    })
  } catch (e) {
    console.error(e)
  }
}

type GameCreationData = {
  dateTime: Date
  result: string
  resultColor: Color
  resultByResignation: boolean
  resultByPoints?: number
  resultByTime?: boolean
  winnerId: number
  blackId: number
  whiteId: number
  eloBlack?: number
  eloWhite?: number
}

async function createGames() {
  try {
    const gamesCreationData: GameCreationData[] = [
      {
        dateTime: new Date(2024, 3, 8),
        result: "W+R",
        resultColor: Color.White,
        resultByResignation: true,
        winnerId: 1,
        blackId: 2,
        whiteId: 1,
        eloBlack: 2100,
        eloWhite: 2200,
      },
      {
        dateTime: new Date(2024, 3, 9),
        result: "B+R",
        resultColor: Color.Black,
        resultByResignation: true,
        winnerId: 1,
        blackId: 2,
        whiteId: 1,
      },
    ]

    for (const [i, gData] of gamesCreationData.entries()) {
      const lastEloBlack = await findLastElo(gData.blackId)
      const lastEloWhite = await findLastElo(gData.whiteId)

      const eloBlack = gData.eloBlack ?? lastEloBlack!
      const eloWhite = gData.eloWhite ?? lastEloWhite!

      const gameResult = getGameResult(gData.result)

      const { eloDeltaBlack, eloDeltaWhite } = calculateElo(
        toNumber(eloBlack),
        toNumber(eloWhite),
        gameResult
      )

      await prisma.game.create({
        data: {
          nanoid: i.toString(),
          dateTime: gData.dateTime,
          result: gData.result,
          resultColor: gData.resultColor,
          resultByResignation: gData.resultByResignation,
          eloBlack,
          eloDeltaBlack,
          eloWhite,
          eloDeltaWhite,
          winnerId: gData.winnerId,
          blackId: gData.blackId,
          whiteId: gData.whiteId,
        },
      })
    }
  } catch (e) {
    console.error(e)
  }
}

async function createArticles() {
  try {
    await prisma.article.createMany({
      data: [
        {
          nanoid: "1",
          title: "História da Brasil Nihon Kiin",
          content: "Era uma vez...",
          thumbnailLink:
            "https://nihonkiin.com.br/conteudo/principal/historia/Foto-Histo%CC%81rica-Brasil-Nihon-Kiin-small.jpg",
          createdAt: new Date(2024, 0, 1),
          updatedAt: new Date(2024, 0, 1),
          authorId: 3,
        },
        {
          nanoid: "2",
          createdAt: new Date(2024, 0, 2),
          updatedAt: new Date(2024, 0, 2),
          title: "O Go, por Jorge Luís Borges",
          abstract:
            "O famoso poema, do famoso poeta argentino",
          content:
            "<p>Hoje, nove de setembro de 1978,</p><p>Tive nas palmas de minha mão um pequeno disco dos trezentos e sessenta e um que se</p>",
          authorId: 4,
        },
      ],
    })
  } catch (e) {
    console.error(e)
  }
}

async function seed() {
  await deleteAll()
  await createUsers()
  await createGames()
  await createArticles()
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
