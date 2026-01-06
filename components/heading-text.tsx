interface HeadingProps {
  children?: string
  h3?: string
  subtext?: string
  className?: string
}

export default function HeadingText({
  children,
  h3,
  subtext,
  className,
}: HeadingProps) {
  return (
    <div className={`space-y-0 ${className}`}>
      <h1 className="font-serif text-3xl font-bold text-pink-950 antialiased drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] lg:text-4xl">
        {children}
      </h1>
      {h3 && (
        <h3 className="font-serif text-2xl font-bold text-pink-950 antialiased drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] lg:text-2xl">
          {h3}
        </h3>
      )}
      {subtext && (
        <h2 className="font-sans font-light text-muted-foreground text-pink-600 lg:text-lg">
          {subtext}
        </h2>
      )}
    </div>
  )
}
