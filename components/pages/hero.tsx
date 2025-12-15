"use client"

import Link from "next/link"
import Image from "next/image"
import * as React from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { carouselSection, heroHeader } from "@/config/contents"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"

export default function HeroHeader() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )
  return (
    <section className="w-full overflow-hidden pb-0 pt-0">
      <Carousel plugins={[plugin.current]} className="relative h-full w-full">
        <CarouselContent className="h-[50vh] md:h-[60vh] lg:h-[70vh]">
          {carouselSection.content.map((cards, index) => (
            <CarouselItem key={index} className="h-full w-full pl-0">
              <Card className="h-full w-full rounded-none border-0 bg-transparent shadow-none">
                <CardContent className="flex h-full w-full items-center justify-center p-0">
                  <img
                    src={cards.image}
                    alt="Card image"
                    className="h-full w-full object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Text content */}
        <div className="absolute left-8 top-1/2 flex w-[85%] -translate-y-1/2 flex-col gap-3 text-left md:left-16 md:w-2/3 lg:bottom-20 lg:left-48 lg:top-auto lg:w-1/3 lg:translate-y-0 lg:gap-5">
          <div className="space-y-2 lg:space-y-4">
            <h1 className="font-serif text-2xl font-semibold tracking-wide text-white antialiased drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] md:text-4xl lg:text-4xl">
              {heroHeader.header}
            </h1>
            <h2 className="font-light tracking-wide text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] md:text-lg lg:text-xl">
              {heroHeader.subheader}
            </h2>
          </div>

          <Button
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "w-fit rounded-full border-2 border-yellow-400 bg-yellow-400 px-6 py-4 text-sm font-medium tracking-wider text-black shadow-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:shadow-2xl md:px-8 md:py-5 md:text-base lg:px-10 lg:py-2 lg:text-base"
            )}
          >
            Order Now
          </Button>
        </div>

        {/* <CarouselPrevious className="absolute" />
        <CarouselNext /> */}
      </Carousel>
    </section>
  )
}
