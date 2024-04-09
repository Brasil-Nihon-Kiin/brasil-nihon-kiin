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

export function toDate(d: Date | string | number) {
  return new Date(d)
}

export function toJSON(o: Object) {
  return JSON.parse(JSON.stringify(o))
}

export function clipString(s: string) {
  return s.length <= 140 ? s : s.substring(140)
}
