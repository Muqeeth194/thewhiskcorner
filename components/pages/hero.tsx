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
import Image from "next/image"

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
        <CarouselContent className="h-[60vh] md:h-[70vh] lg:h-[100vh]">
          {carouselSection.content.map((card, index) => (
            <CarouselItem key={index} className="h-full w-full pl-0">
              <Card className="h-full w-full border-0 bg-transparent shadow-none">
                <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                  {/* 1. Desktop/Laptop */}
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

                  {/* 2. Mobile/Tablet fallback */}
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

                  {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:from-black/70 lg:via-transparent" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Floating Text Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pt-16 sm:pt-24 lg:justify-start lg:pt-10">
          <div className="container px-4 sm:px-6 md:px-20">
            <div
              className={cn(
                "flex max-w-3xl flex-col gap-3 text-center sm:gap-6 lg:text-left", // Reduced gap slightly for mobile
                "px-2 py-4 sm:p-12 md:p-16 lg:p-32", // Reduced vertical padding on mobile

                // 1. BLUR & MASK FIX: Added `sm:` so they are completely disabled on mobile
                "sm:backdrop-blur-sm",
                "rounded-none border-none shadow-none",
                "sm:[mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]"
              )}
            >
              <div className="space-y-2 sm:space-y-4">
                {/* 2. H1 TEXT SIZE: Shrunk from text-2xl to text-xl for mobile */}
                <h1 className="font-serif text-xl font-bold leading-tight tracking-tight text-pink-950 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] sm:text-4xl lg:text-5xl">
                  {heroHeader.header}
                </h1>

                {/* 3. H2 TEXT SIZE: Shrunk from text-sm to text-xs for mobile */}
                <h2 className="font-sans text-xs font-light italic leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-lg md:text-lg lg:text-lg">
                  {heroHeader.subheader}
                </h2>
              </div>

              <div className="mt-2 flex justify-center sm:mt-0 lg:justify-start">
                <Button
                  asChild
                  className={cn(
                    // 4. BUTTON FIX: Reduced mobile padding (px-5 py-3) to match the smaller text
                    "rounded-full bg-white/80 px-5 py-3 text-xs font-semibold text-pink-800 shadow-xl transition-all duration-200 hover:scale-105 hover:bg-pink-900 hover:text-white hover:shadow-2xl sm:px-8 sm:py-6 sm:text-base md:text-lg",
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
