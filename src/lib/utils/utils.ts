import Decimal from "decimal.js"

export function toNumber(n: number | Decimal | string) {
  const d = new Decimal(
    typeof n === "string" ? parseFloat(n) : n
  )
  return d.toNumber()
}
