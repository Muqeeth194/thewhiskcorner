"use client"

import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"
import { carouselSection, heroHeader } from "@/config/contents"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"

export default function HeroHeader() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <section className="relative w-full overflow-hidden pb-0 pt-0 shadow-lg">
      <Carousel
        plugins={[plugin.current]}
        className="relative h-full w-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-[60vh] md:h-[70vh] lg:h-[90vh]">
          {carouselSection.content.map((card, index) => (
            <CarouselItem key={index} className="h-full w-full pl-0">
              <Card className="h-full w-full border-0 bg-transparent shadow-none">
                <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                  <picture className="h-full w-full">
                    {/* 1. Ultra-Wide: 21:9 image, anchored center */}
                    <source
                      media="(min-width: 1536px)"
                      srcSet={card.imageWide || card.imageDesktop || card.image}
                    />

                    {/* 2. Desktop/Laptop: Use the 3:2 or 16:9 image */}
                    {/* 👇 CHANGED: Anchor to the RIGHT so the cake never gets cut off */}
                    <img
                      src={card.imageDesktop || card.image}
                      alt={card.altText || "Cake showcase"}
                      className="hidden h-full w-full object-cover object-center lg:block"
                    />

                    {/* 3. Mobile/Tablet fallback */}
                    {/* Keep object-center for mobile as vertical cropping is less risky here */}
                    <img
                      src={card.imageMobile || card.image}
                      alt={card.altText || "Cake showcase"}
                      className="block h-full w-full object-cover object-center lg:hidden"
                    />
                  </picture>

                  {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:from-black/70 lg:via-transparent" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Floating Text Content */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
          <div className="container px-6 md:px-28">
            <div className="flex max-w-xl flex-col gap-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-4xl lg:text-5xl">
                  {heroHeader.header}
                </h1>
                <h2 className="font-sans text-base font-light italic leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] sm:text-lg md:text-xl lg:text-xl">
                  {heroHeader.subheader}
                </h2>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Button
                  asChild
                  className={cn(
                    "rounded-full bg-white/80 px-6 py-4 text-sm font-semibold text-pink-700 shadow-xl transition-all duration-200 hover:scale-105 hover:bg-pink-800 hover:text-white hover:shadow-2xl sm:px-8 sm:py-6 sm:text-base md:text-lg",
                    "border-0 ring-0"
                  )}
                >
                  <Link href="/gallery">Order Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  )
}
