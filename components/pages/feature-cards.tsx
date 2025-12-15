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

        <div className="grid grid-cols-1 place-items-center gap-48 py-20 md:grid-cols-1">
          {featuredCategory.content.map((cards, index) => {
            const isEven = index % 2 === 0
            return (
              <Link
                key={cards.text}
                href={`gallery?filter=${cards.text}&page=1`}
                className="flex w-full justify-center"
              >
                <Card
                  key={cards.text}
                  className={`group relative flex h-64 w-[90vw] items-center justify-between overflow-visible rounded-xl border-none p-8 shadow-sm transition-all duration-200 hover:bg-pink-200 hover:shadow-lg dark:bg-secondary ${
                    isEven ? "flex-row " : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`z-10 flex w-2/3 flex-col gap-2 ${isEven ? "items-start text-left" : "items-end text-right"}`}
                  >
                    <CardTitle className="text-3xl font-bold md:text-4xl ">
                      {cards.text}
                    </CardTitle>
                    <CardDescription className="pb-4 text-lg font-medium text-muted-foreground">
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
                    className={`absolute top-1/2  -translate-y-1/2 drop-shadow-xl transition-all duration-500 group-hover:scale-125 ${
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
