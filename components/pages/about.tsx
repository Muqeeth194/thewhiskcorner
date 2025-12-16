"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, UtensilsCrossed, Clock, MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-body text-slate-800">
      {/* 1. HERO SECTION */}
      <section className="relative flex h-[65vh] w-full items-center justify-center overflow-hidden bg-pink-50">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-100/50 via-transparent to-transparent"></div>

        <div className="container z-10 flex flex-col items-center text-center">
          <div className="mb-6 flex gap-3">
            <Badge
              variant="secondary"
              className="bg-white/80 px-4 py-1 text-xs font-bold tracking-widest text-slate-500 backdrop-blur-sm"
            >
              EST. 2018
            </Badge>
            <Badge
              variant="outline"
              className="border-pink-300 bg-pink-100/50 px-4 py-1 text-xs font-bold tracking-widest text-pink-700"
            >
              HYDERABAD
            </Badge>
          </div>

          <h1 className="font-serif text-5xl font-bold leading-tight text-slate-900 md:text-7xl">
            The Whisk Corner
          </h1>
          <p className="mt-4 font-serif text-2xl italic text-pink-600 md:text-3xl">
            "Don't be afraid to take whisks."
          </p>

          <p className="mt-8 max-w-xl font-sans text-lg text-slate-600 md:text-xl">
            A boutique, <strong>appointment-only</strong> cake studio founded by
            sisters Mahreen, and Taniya.
          </p>

          <div className="mt-8 flex items-center gap-2 text-sm font-medium text-slate-500">
            <Clock className="h-4 w-4" />
            <span>By Appointment Only</span>
            <span className="mx-2 text-slate-300">|</span>
            <MapPin className="h-4 w-4" />
            <span>Hyderabad, India</span>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="container py-20 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Image Composition */}
          <div className="relative mx-auto w-3/4 max-w-sm lg:max-w-md">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-2xl transition-all duration-500">
              <Image
                src="/twc.png"
                alt="The Khan Sisters"
                fill
                className="object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="font-serif text-xl font-bold text-white">
                  Mahreen & Taniya
                </p>
                <p className="text-sm text-white/90">Founders</p>
              </div>
            </div>

            {/*3. Floating Badge */}
            <div className="absolute -right-6 top-8 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-yellow-300 p-2 text-center shadow-xl md:-right-10 md:h-24 md:w-24">
              <span className="text-sm font-bold text-black">4.6 ★</span>
              <span className="text-[10px] font-medium leading-tight text-black/80">
                On Wanderlog
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-6 text-left">
            <h2 className="font-serif text-4xl font-bold text-slate-900 lg:text-5xl">
              Strictly Homemade. <br />
              <span className="text-pink-600">Unapologetically Premium.</span>
            </h2>
            <div className="space-y-6 font-sans text-lg leading-relaxed text-slate-600">
              <p>
                In a city of mass-produced bakeries, we chose to stay small,
                intimate, and <strong>exclusive</strong>. Founded in 2018, The
                Whisk Corner isn't just a bakery—it's a home studio where we
                work on <em>your</em> specific order for the entire week.
              </p>
              <p>
                We don't have "zillions" of orders or factory machines. We do
                the sourcing, baking, decorating, and photography ourselves.
                That means when you take a bite of our{" "}
                <strong>Chocolate Hazelnut Praline</strong>, you are tasting
                hours of dedicated craftsmanship.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-pink-100 bg-white p-6 shadow-sm">
                <Heart className="mb-3 h-8 w-8 text-pink-400" />
                <h3 className="font-bold text-slate-900">Made with Love</h3>
                <p className="text-sm text-slate-500">
                  No preservatives, just pure passion.
                </p>
              </div>
              <div className="rounded-xl border border-pink-100 bg-white p-6 shadow-sm">
                <UtensilsCrossed className="mb-3 h-8 w-8 text-yellow-400" />
                <h3 className="font-bold text-slate-900">Freshly Baked</h3>
                <p className="text-sm text-slate-500">
                  Baked only after you order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE OBSESSIONS (Updated from Reviews) */}
      {/* Changed bg-slate-900 to bg-pink-950 (Deep Burgundy/Chocolate) */}
      <section className="bg-pink-200 py-24 text-white">
        <div className="container text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold tracking-wide text-black lg:text-5xl">
            The Crowd Favorites
          </h2>
          {/* Changed text-slate-400 to text-pink-200/80 for better color harmony */}
          <p className="mb-16 text-pink-600">
            Rated "Best Baker" by our loyal customers on Wanderlog.
          </p>

          <div className="grid w-full gap-6 md:grid-cols-3">
            {[
              {
                title: "Hazelnut Praline",
                desc: "Our signature chocolate cake with a crunch that customers rave about.",
                icon: "🍫",
              },
              {
                title: "Classic Cheesecakes",
                desc: "Creamy, rich, and perfectly set. A true indulgence.",
                icon: "🧀",
              },
              {
                title: "Fudgy Brownies",
                desc: "Dense, dark, and decadent. The perfect pickup treat.",
                icon: "🍪",
              },
            ].map((item, i) => (
              <div
                key={i}
                // Changed bg-white/5 to bg-white/10 for slightly better visibility on the burgundy
                className="group relative overflow-hidden rounded-2xl bg-white/80 p-8 transition-all hover:-translate-y-2 hover:bg-white/40"
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-3 font-serif text-2xl font-semibold text-pink-900">
                  {item.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-pink-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER CTA */}
      <section className="container py-24 text-center">
        <div className="mx-auto max-w-2xl space-y-8 rounded-[3rem] bg-pink-100 px-8 py-16 text-pink-900">
          <h2 className="font-serif text-4xl font-bold">
            Plan Your Celebration
          </h2>
          <p className="text-lg">
            Since we bake <strong>by appointment only</strong>, our calendar
            fills up fast. Pre-order your custom cake today to secure your date.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-pink-600 px-12 py-6 text-lg font-semibold text-white shadow-xl hover:bg-pink-700"
          >
            Book an Appointment
          </Button>
        </div>
      </section>
    </main>
  )
}
