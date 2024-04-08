export enum Color {
  Black = "Black",
  White = "White",
}

export enum GameResult {
  Black,
  White,
  Tie,
}

export function findK(elo: number) {
  if (elo < 1500) return 50
  else if (elo >= 1500) return 40
  else return 30
}

export function findScore(gameResult: GameResult) {
  switch (gameResult) {
    case GameResult.Black:
      return { scoreBlack: 1, scoreWhite: 0 }
    case GameResult.White:
      return { scoreBlack: 0, scoreWhite: 1 }
    case GameResult.Tie:
      return { scoreBlack: 0.5, scoreWhite: 0.5 }
  }
}

export function calculateElo(
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

export function getGameResult(result: string) {
  return result.includes("W")
    ? GameResult.White
    : result.includes("B")
    ? GameResult.Black
    : GameResult.Tie
}
