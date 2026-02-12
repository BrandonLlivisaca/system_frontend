import type { FieldError } from 'react-hook-form'
import { cn } from '@/shared/utils/cn'

interface FormFieldProps {
  label: string
  error?: FieldError
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  )
}
