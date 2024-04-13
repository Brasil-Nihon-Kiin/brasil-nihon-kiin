type FormErrorMessageProps = {
  message: string
}

export function FormErrorMessage({
  message,
}: FormErrorMessageProps) {
  return (
    <p className="mt-1 ml-4 text-error text-sm">
      {message}
    </p>
  )
}
