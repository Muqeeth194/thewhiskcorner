import HeadingText from "@/components/heading-text"
import { featuredCategory } from "@/config/contents"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function FeatureCards() {
  return (
    <section className="bg-body ">
      <div className="container space-y-8 py-12 text-center lg:py-20">
        {featuredCategory.header || featuredCategory.subheader ? (
          <HeadingText subtext={featuredCategory.subheader}>
            {featuredCategory.header}
          </HeadingText>
        ) : null}

        <div className="grid grid-cols-1 place-items-center gap-16 py-12 md:grid-cols-1 md:gap-40 md:py-20">
          {featuredCategory.content.map((cards, index) => {
            const isEven = index % 2 === 0
            return (
              <Link
                key={cards.text}
                href={`/gallery?category=${encodeURIComponent(cards.text)}`}
                className="flex w-full justify-center md:max-w-[85vw] lg:max-w-[75vw]"
              >
                <Card
                  key={cards.text}
                  className={`group relative flex h-auto w-full flex-col-reverse items-center justify-between overflow-visible rounded-3xl border-none p-8 shadow-xl transition-all duration-500 hover:bg-pink-200 hover:shadow-2xl dark:bg-secondary md:h-64 md:flex-row md:p-12 ${
                    isEven ? "md:flex-row " : "md:flex-row-reverse"
                  }`}
                >
                  {/* TEXT SECTION */}
                  <div
                    className={`z-10 flex w-full flex-col items-center gap-2 text-center md:px-12 ${
                      isEven
                        ? "md:items-start md:text-left"
                        : "md:items-end md:text-right"
                    }`}
                  >
                    <CardTitle className="font-sans font-serif text-2xl text-pink-950 transition-all duration-500 group-hover:scale-110 md:text-3xl">
                      {cards.text}
                    </CardTitle>
                    <CardDescription className="pb-4 font-sans font-light text-pink-600 transition-colors duration-300 group-hover:text-slate-500 md:text-lg">
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

                  {/* IMAGE SECTION */}
                  {cards.image && (
                    <div
                      className={`relative mb-6 h-40 w-40 drop-shadow-xl transition-all duration-500 group-hover:scale-110 md:absolute md:top-1/2 md:mb-0 md:h-[450px] md:w-[450px] md:-translate-y-1/2 ${
                        isEven ? "md:-right-0" : "md:-left-0"
                      }`}
                    >
                      <Image
                        src={cards.image}
                        alt={cards.text}
                        fill
                        className="object-contain"
                        // Tells Next.js to serve a tiny 160px image on mobile, and a 450px one on desktop
                        sizes="(max-width: 768px) 160px, 450px"
                      />
                    </div>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
