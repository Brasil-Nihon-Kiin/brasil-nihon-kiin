import { nanoid } from "nanoid"

export type Nid = string

function standardNanoid(length: number = 8) {
  return nanoid(length)
}

function standardNanoids(
  howMany: number = 1,
  nidLength: number = 8
): Nid[] {
  return Array.from({ length: howMany }, () =>
    standardNanoid(nidLength)
  )
}
