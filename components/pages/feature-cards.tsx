import Image from "next/image"
import HeadingText from "@/components/heading-text"
import { featuredCategory } from "@/config/contents"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function FeatureCards() {
  return (
    <section className="bg-body ">
      <div className="container space-y-8  py-12 text-center lg:py-20">
        {featuredCategory.header || featuredCategory.subheader ? (
          <HeadingText subtext={featuredCategory.subheader}>
            {featuredCategory.header}
          </HeadingText>
        ) : null}

        <div className="grid grid-cols-1 place-items-center gap-44 py-20 md:grid-cols-1">
          {featuredCategory.content.map((cards, index) => {
            const isEven = index % 2 === 0
            return (
              <Link
                key={cards.text}
                href={`gallery?filter=${cards.text}&page=1`}
                className="flex w-full justify-center md:max-w-[85vw] lg:max-w-[75vw]"
              >
                <Card
                  key={cards.text}
                  className={`md:h-70 group relative flex h-64 w-full items-center justify-between overflow-visible rounded-3xl border-none p-10 shadow-xl transition-all duration-500 hover:bg-pink-200 hover:shadow-2xl dark:bg-secondary md:flex-row md:p-12 ${
                    isEven ? "flex-row " : "flex-row-reverse"
                  }`}
                >
                  {/* TEXT SECTION */}
                  <div
                    className={`z-10 flex w-full flex-col gap-2 px-12 ${isEven ? "items-start text-left" : "items-end text-right"}`}
                  >
                    <CardTitle className="font-sans font-serif text-3xl transition-all duration-500 group-hover:scale-110 md:text-3xl">
                      {cards.text}
                    </CardTitle>
                    <CardDescription className="pb-4 font-sans font-light text-muted-foreground text-pink-600 transition-colors duration-300 group-hover:text-slate-500 md:text-lg">
                      {cards.subtext}
                    </CardDescription>
                    <div
                      key={cards.text}
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "sm",
                        }),
                        "rounded-full px-6 py-5 text-black transition-all duration-500 group-hover:scale-110"
                      )}
                    >
                      Learn More
                    </div>
                  </div>
                  <div
                    className={`absolute top-1/2  -translate-y-1/2 drop-shadow-xl transition-all duration-500 group-hover:scale-110 ${
                      isEven ? "-right-0" : "-left-0"
                    }`}
                  >
                    <img
                      src="/anniversary_cake.png"
                      alt={cards.text}
                      className="h-96 w-96 object-contain"
                    />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
