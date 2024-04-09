// Cannot use `@utils` because the `seed.ts` file is
// standalone...
import { prisma } from "../../utils/prisma_utils"

import { NumberId } from "../../types/id"

export async function findLastElo(playerId: NumberId) {
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
