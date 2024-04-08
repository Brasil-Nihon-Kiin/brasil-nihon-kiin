import { Prisma } from "@prisma/client"

import prisma from "../src/lib/utils/prisma_utils"

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
  winnerId: number
  blackId: number
  whiteId: number
  eloBlack?: number
  eloWhite?: number
}

enum Color {
  Black,
  White,
}

enum GameResult {
  Black,
  White,
  Tie,
}

function findK(elo: number) {
  if (elo < 1500) return 50
  else if (elo >= 1500) return 40
  else return 30
}

function findScore(gameResult: GameResult) {
  switch (gameResult) {
    case GameResult.Black:
      return { scoreBlack: 1, scoreWhite: 0 }
    case GameResult.White:
      return { scoreBlack: 0, scoreWhite: 1 }
    case GameResult.Tie:
      return { scoreBlack: 0.5, scoreWhite: 0.5 }
  }
}

function calculateElo(
  eloBlack: number,
  eloWhite: number,
  gameResult: GameResult
) {
  const ratingDiffBlack = eloWhite - eloBlack
  const ratingDiffWhite = eloBlack - eloWhite

  const expectedBlack =
    1 / (1 + 10 ** (ratingDiffBlack / 400))
  const expectedWhite =
    1 / (1 + 10 ** (ratingDiffWhite / 400))

  const kBlack = findK(eloBlack)
  const kWhite = findK(eloWhite)

  const { scoreBlack, scoreWhite } = findScore(gameResult)

  const eloDeltaBlack =
    (scoreBlack - expectedBlack) * kBlack
  const eloDeltaWhite =
    (scoreWhite - expectedWhite) * kWhite

  return { eloDeltaBlack, eloDeltaWhite }
}

function getGameResult(result: string) {
  return result.includes("W")
    ? GameResult.White
    : result.includes("B")
    ? GameResult.Black
    : GameResult.Tie
}

async function createGames() {
  try {
    const gamesCreationData: GameCreationData[] = [
      {
        dateTime: new Date(),
        result: "W+R",
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
