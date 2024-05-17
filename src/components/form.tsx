import { FormHTMLAttributes, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { SomeZodObject, ZodEffects, z } from 'zod'

type FormSchema<T extends z.ZodTypeAny = z.SomeZodObject | z.ZodEffects<any>> =
  | z.ZodEffects<T>
  | z.SomeZodObject

type FormProps<Schema extends FormSchema> = {
  schema: Schema
  children: (methods: UseFormReturn<z.infer<Schema>, any>) => JSX.Element
  onSubmit?: (data: z.infer<Schema>) => void | Promise<void>
  defaultValues?: z.infer<Schema>
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> & {
    useFormProps?: UseFormProps<z.infer<Schema>>
  }

export function Form<
  Schema extends FormSchema<SomeZodObject | ZodEffects<any, any, any>>,
>({
  children,
  useFormProps,
  schema,
  onSubmit,
  defaultValues,

  ...props
}: FormProps<Schema>) {
  const methods = useForm({
    ...useFormProps,
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues)
    }
  }, [defaultValues])

  return (
    <form
      onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
      {...props}
    >
      {children(methods)}
    </form>
  )
}
