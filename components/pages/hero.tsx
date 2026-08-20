"use client"

import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"
import { carouselSection, heroHeader } from "@/config/contents"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroHeader() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <section className="relative w-full overflow-hidden pb-0 pt-0 shadow-lg">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="relative h-full w-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-[75vh] lg:h-[100vh]">
          {carouselSection.content.map((card, index) => (
            <CarouselItem key={index} className="h-full w-full pl-0">
              <Card className="h-full w-full border-0 bg-transparent shadow-none">
                <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                  <div className="hidden h-full w-full bg-pink-50/20 lg:block">
                    <Image
                      src={card.imageWide || card.imageDesktop || card.image}
                      alt={card.altText || "Cake showcase"}
                      fill
                      priority={index === 0}
                      className="z-0 object-cover object-center"
                      sizes="100vw"
                    />
                  </div>
                  <div className="block h-full w-full bg-pink-50/20 lg:hidden">
                    <Image
                      src={card.imageMobile || card.image}
                      alt={card.altText || "Cake showcase"}
                      fill
                      priority={index === 0}
                      className="z-0 object-cover object-center"
                      sizes="100vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:from-black/70 lg:via-transparent" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Floating Text Content */}
        <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 pt-24 lg:justify-start lg:pt-10">
          <div className="container px-4 sm:px-6 md:px-20">
            <div
              className={cn(
                "flex max-w-3xl flex-col gap-3 text-center sm:gap-6 lg:text-left",
                "px-2 py-4 sm:p-12 md:p-16 lg:p-32",
                "sm:backdrop-blur-sm",
                "rounded-none border-none shadow-none",
                "sm:[mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]"
              )}
            >
              <div className="space-y-2 sm:space-y-4">
                <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] md:text-pink-950 lg:text-5xl">
                  {heroHeader.header}
                </h1>
                <h2 className="font-sans text-xs font-light italic leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-lg md:text-lg lg:text-lg">
                  {heroHeader.subheader}
                </h2>
              </div>
              <div className="mt-2 flex justify-center sm:mt-0 lg:justify-start">
                <Button
                  asChild
                  className={cn(
                    "h-auto rounded-full bg-pink-100 px-8 py-3 text-base font-semibold text-pink-950 transition-all duration-300 hover:scale-110 hover:bg-pink-800 hover:text-white hover:shadow-lg",
                    "border-0 ring-0"
                  )}
                >
                  <Link href="/gallery">Order Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {carouselSection.content.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                current === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  )
}
