import { Game, Prisma } from "@prisma/client"

import { prisma } from "../src/lib/utils/prisma_utils"

import {
  Color,
  calculateElo,
  getGameResult,
} from "../src/lib/utils/elo"
import Decimal from "decimal.js"

async function deleteAll() {
  try {
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
        },
        {
          nanoid: "2",
          clerkId: "renan",
          email: "renan@cruz.com",
          username: "renan",
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

// Pick<
//   Game,
//   | "dateTime"
//   | "result"
//   | "resultColor"
//   | "resultByResignation"
//   | "resultByPoints"
//   | "resultByTime"
//   | "winnerId"
//   | "blackId"
//   | "whiteId"
//   | "eloBlack"
//   | "eloWhite"
// >

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
        eloBlack: 2100,
        eloWhite: 2200,
      },
    ]

    for (const [i, gData] of gamesCreationData.entries()) {
      const eloBlack = gData.eloBlack ?? 1000
      const eloWhite = gData.eloWhite ?? 1000

      const gameResult = getGameResult(gData.result)

      const { eloDeltaBlack, eloDeltaWhite } = calculateElo(
        eloBlack,
        eloWhite,
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

async function seed() {
  await deleteAll()
  await createUsers()
  await createGames()
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
