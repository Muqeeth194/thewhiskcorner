import React from "react"
import Image from "next/image"
import { intro } from "@/config/contents"
import HeadingText from "../heading-text"

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-white pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* LEFT SIDE: The Image */}
          <div className="relative w-full lg:w-1/2">
            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src={intro.image}
                alt="Baker dusting a cake with icing sugar"
                width={800}
                height={800}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* RIGHT SIDE: Content & Trust Bar */}
          <div className="flex w-full flex-col justify-center space-y-8 lg:w-1/2">
            {/* Text Content */}
            <div className="space-y-6 text-center lg:text-left">
              {intro.header || intro.subheader ? (
                <HeadingText subtext={intro.subheader}>
                  {intro.header}
                </HeadingText>
              ) : null}
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                {intro.part_1}
              </p>
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                {intro.part_2}
              </p>
            </div>

            {/* The 3-Column Trust Bar */}
            <div className="grid grid-cols-1 gap-8 border-t border-pink-200 pt-8 sm:grid-cols-3 sm:gap-4">
              {/* Metric 1 */}
              <div className="flex flex-col items-center justify-center space-y-2 lg:items-start">
                <h4 className="font-serif text-4xl font-extrabold text-pink-700">
                  {/* Swap this with <CountUp end={1200} suffix="+" /> when ready! */}
                  1,200+
                </h4>
                <p className="text-sm font-medium uppercase tracking-wider text-pink-900/70">
                  Custom Cakes Crafted
                </p>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center justify-center space-y-2 lg:items-start">
                <h4 className="font-serif text-4xl font-extrabold text-pink-700">
                  500+
                </h4>
                <p className="text-sm font-medium uppercase tracking-wider text-pink-900/70">
                  Happy Clients Served
                </p>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center justify-center space-y-2 lg:items-start">
                <h4 className="font-serif text-4xl font-extrabold text-pink-700">
                  100%
                </h4>
                <p className="text-sm font-medium uppercase tracking-wider text-pink-900/70">
                  Bespoke Designs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
