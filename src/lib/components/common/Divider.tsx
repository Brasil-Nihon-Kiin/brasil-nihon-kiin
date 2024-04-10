type DividerProps = {
  text: string
}

export function Divider({ text }: DividerProps) {
  return (
    <div className="divider font-medium text-xl">
      {text}
    </div>
  )
}
