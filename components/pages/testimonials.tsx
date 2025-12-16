"use client"

import Image from "next/image"
import HeadingText from "@/components/heading-text"
import { testimonials } from "@/config/contents"
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
import { Quote, Star } from "lucide-react" // Import Star icon

export default function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section className="container space-y-8 py-12 lg:py-24" id="testimonials">
      {testimonials.header || testimonials.subheader ? (
        <HeadingText subtext={testimonials.subheader} className="text-center">
          {testimonials.header}
        </HeadingText>
      ) : null}

      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {testimonials.content.map((card, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full p-1">
                  <Card className="h-full border-none bg-pink-50/50 shadow-none transition-all hover:bg-pink-100/50">
                    <CardContent className="flex flex-col items-center justify-between gap-6 p-8">
                      <Quote className="h-8 w-8 rotate-180 fill-pink-200 text-pink-200" />

                      {/* ADDED: Star Rating Rendering */}
                      <div className="flex gap-0.5">
                        {Array.from({ length: card.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      <CardDescription className="text-base font-medium italic leading-relaxed text-slate-700">
                        "{card.subtext}"
                      </CardDescription>

                      <div className="flex flex-col items-center gap-1">
                        <CardTitle className="font-serif text-lg font-bold text-pink-950">
                          {card.text}
                        </CardTitle>
                        <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                          Verified Buyer
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious className="border-pink-200 text-pink-800 hover:bg-pink-100" />
            <CarouselNext className="border-pink-200 text-pink-800 hover:bg-pink-100" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
