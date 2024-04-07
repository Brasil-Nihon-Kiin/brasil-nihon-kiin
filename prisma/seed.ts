import { Prisma } from "@prisma/client"

import prisma from "../lib/prisma"

// import { nanoid } from "nanoid"

export type Nid = string

// function standardNanoid(length: number = 8) {
//   return nanoid(length)
// }

// function standardNanoids(
//   howMany: number = 1,
//   nidLength: number = 8
// ): Nid[] {
//   return Array.from({ length: howMany }, () =>
//     standardNanoid(nidLength)
//   )
// }

async function deleteAll() {
  try {
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

async function createUsers(nids: Nid[]) {
  try {
    await prisma.user.createMany({
      data: [
        {
          nanoid: nids[0],
          clerkId: "psygo",
          email: "philippe@fanaro.com",
          username: "psygo",
        },
      ],
    })
  } catch (e) {
    console.error(e)
  }
}

async function seed() {
  await deleteAll()

  const playersNids = ["asdf"]

  await createUsers(playersNids)
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
