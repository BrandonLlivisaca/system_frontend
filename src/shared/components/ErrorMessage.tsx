import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  )
}
