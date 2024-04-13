export enum EventCategories {
  tournament = "Torneio",
  socializing = "Confraternização",
  other = "Outro",
}

export const eventCategories =
  Object.values(EventCategories)

export function stringToEventCategory(s: string) {
  return Object.values(EventCategories).find(
    (t) => t === s
  )!
}
