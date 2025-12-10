"use client"

import Link from "next/link"
import Image from "next/image"
import * as React from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { carouselSection, featureCards, heroHeader } from "@/config/contents"
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
    <section className="container flex flex-col gap-4 pb-12 pt-0 text-center lg:items-center lg:gap-8 lg:pb-8">
      <div className="w-screen">
        <Carousel
          plugins={[plugin.current]}
          className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {carouselSection.content.map((cards, index) => (
              <CarouselItem key={index} className="pl-0">
                <div>
                  <Card className="rounded-none border-0 bg-transparent shadow-none">
                    <CardContent className="flex h-[60vh] w-full items-center justify-center p-0">
                      <img
                        src={cards.image}
                        alt="Card image"
                        className="h-full w-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>

      <div className="flex w-full flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold lg:text-5xl">
            {heroHeader.header}
          </h1>
          <h2 className="text-lg font-light text-muted-foreground lg:text-2xl">
            {heroHeader.subheader}
          </h2>
        </div>
      </div>

      <div className="hidden items-center justify-center gap-2 md:block md:flex">
        <Button size="lg">Order Cake</Button>
        <Button size="lg">View Gallery</Button>
      </div>
    </section>
  )
}
