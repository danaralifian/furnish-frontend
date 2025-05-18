import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className={cn("text-2xl font-bold tracking-tight", titleClassName)}>{title}</h2>
      {description && <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>}
    </div>
  )
}
