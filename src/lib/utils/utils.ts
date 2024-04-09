import Decimal from "decimal.js"

export function setTitle(text: string) {
  if (typeof document !== "undefined") {
    document.title = `${text} - Brasil Nihon Kiin`
  }
}

export function toNumber(n: number | Decimal | string) {
  const d = new Decimal(
    typeof n === "string" ? parseFloat(n) : n
  )
  return d.toNumber()
}

export function toJSON(o: Object) {
  return JSON.parse(JSON.stringify(o))
}
