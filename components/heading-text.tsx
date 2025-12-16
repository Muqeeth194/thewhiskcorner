interface HeadingProps {
  children: string
  subtext?: string
  className?: string
}

export default function HeadingText({
  children,
  subtext,
  className,
}: HeadingProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1 className="font-serif text-3xl font-bold text-primary antialiased drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] lg:text-4xl">
        {children}
      </h1>
      {subtext && (
        <h2 className="font-sans font-light text-muted-foreground text-pink-600 lg:text-lg">
          {subtext}
        </h2>
      )}
    </div>
  )
}
