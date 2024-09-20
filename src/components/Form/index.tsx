import React, { forwardRef, memo } from "react"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import {
  FieldProvider,
  FormItemProvider,
  useFieldContext,
  useFormItemContext,
} from "./context"
import { cn } from "utils/helper"

//* merged hook
const useFormField = () => {
  const { name } = useFieldContext()
  const { id } = useFormItemContext()
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(name, formState)

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

//* provider
const FormRoot = FormProvider

//* field
const FormField = (props: ControllerProps) => {
  return (
    <FieldProvider value={{ name: props.name }}>
      <Controller {...props} />
    </FieldProvider>
  )
}

//* item
type FormItemType = {
  asChild?: boolean
} & React.ComponentProps<"div">

const FormItem = memo(
  React.forwardRef<HTMLDivElement, FormItemType>(
    ({ className, asChild, ...props }, ref) => {
      const id = React.useId()
      const Comp = asChild ? Slot : "div"

      return (
        <FormItemProvider value={{ id }}>
          <Comp
            ref={ref}
            className={cn("form-item space-y-2", className)}
            {...props}
          />
        </FormItemProvider>
      )
    }
  )
)

//* label
type FormLabelProps = {
  required?: boolean
} & React.ComponentProps<"label">

const FormLabel = memo(
  forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ className, required, ...props }, ref) => {
      const { error, formItemId } = useFormField()

      return (
        <label
          ref={ref}
          className={cn(
            "font-semibold",
            error && "text-red-500",
            required && 'after:content-["*"] after:ml-0.5 after:text-red-500',
            className
          )}
          htmlFor={formItemId}
          {...props}
        />
      )
    }
  )
)

//* control
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})

const FormDescription = memo(
  forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => {
      const { formDescriptionId } = useFormField()

      return (
        <p
          ref={ref}
          id={formDescriptionId}
          className={cn("text-sm text-slate-600 italic", className)}
          {...props}
        />
      )
    }
  )
)

const FormError = forwardRef<HTMLParagraphElement, React.ComponentProps<"p">>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error.message) : children

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(
          "text-sm font-medium text-red-500 empty:hidden",
          className
        )}
        {...props}
      >
        {body}
      </p>
    )
  }
)

// export
const Form = Object.assign(FormRoot, {
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Desc: FormDescription,
  Error: FormError,
})

export { useFormField, Form }
