import { Prisma } from "@prisma/client"

import { prisma } from "../src/lib/utils/prisma_utils"

import "../src/lib/utils/array"
import {
  Color,
  calculateElo,
  getGameResult,
} from "../src/lib/utils/elo"
import { toNumber } from "../src/lib/utils/utils"

import { NumberId } from "../src/lib/types/id"

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

async function findLastElo(playerId: NumberId) {
  try {
    const lastGamesByPlayer = await prisma.game.findMany({
      where: {
        OR: [
          {
            blackId: playerId,
          },
          {
            whiteId: playerId,
          },
        ],
      },
      orderBy: { dateTime: "desc" },
      take: 1,
    })

    if (lastGamesByPlayer.length === 0) return null

    const lastGame = lastGamesByPlayer.first()

    if (lastGame.blackId === playerId)
      return lastGame.eloBlack.add(lastGame.eloDeltaBlack)
    else
      return lastGame.eloWhite.add(lastGame.eloDeltaWhite)
  } catch (e) {
    console.error(e)
  }
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
