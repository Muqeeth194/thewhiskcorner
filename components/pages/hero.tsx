"use client"

import Link from "next/link"
import * as React from "react"
import { buttonVariants } from "@/components/ui/button"
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
    Autoplay({ delay: 4000, stopOnInteraction: false }) // Slowed down for a calmer feel
  )

  return (
    <section className="relative w-full overflow-hidden pb-0 pt-0">
      <Carousel
        plugins={[plugin.current]}
        className="relative h-full w-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-[60vh] md:h-[70vh] lg:h-[75vh]">
          {carouselSection.content.map((card, index) => (
            <CarouselItem key={index} className="h-full w-full pl-0">
              <Card className="h-full w-full border-0 bg-transparent shadow-none">
                <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                  {/* Image */}
                  <img
                    src={card.image}
                    alt="Cake showcase"
                    className="h-full w-full object-cover"
                  />

                  {/* Modern Gradient Overlay: Ensures text is readable on ANY image */}
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
                <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-4xl lg:text-5xl">
                  {heroHeader.header}
                </h1>
                <h2 className="font-sans text-lg font-light italic leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] md:text-xl lg:text-xl">
                  {heroHeader.subheader}
                </h2>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Button
                  asChild
                  className={cn(
                    "rounded-full bg-white px-8 py-6 text-base font-semibold text-pink-950 shadow-xl transition-all hover:scale-105 hover:bg-pink-200 hover:shadow-2xl md:text-lg",
                    "border-0 ring-0" // Removing borders for a cleaner look
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
