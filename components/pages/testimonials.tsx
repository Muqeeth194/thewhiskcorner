"use client"

import Image from "next/image"
import HeadingText from "@/components/heading-text"
import { testimonials } from "@/config/contents"
import { Icons } from "@/components/icons"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import React from "react"

export default function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  )

  return (
    <section className="container space-y-8 py-12 lg:py-20 " id="features">
      {testimonials.header || testimonials.subheader ? (
        <HeadingText subtext={testimonials.subheader} className="text-center">
          {testimonials.header}
        </HeadingText>
      ) : null}

      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <Carousel plugins={[plugin.current]} className="w-full">
          <CarouselContent>
            {testimonials.content.map((cards, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex h-32 items-center justify-center p-6">
                      <span>
                        <CardDescription className="text-lg italic">
                          {cards.subtext}
                        </CardDescription>
                        <CardTitle className="text-md mt-2 font-bold">
                          {cards.text}
                        </CardTitle>
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
