import React from "react"
import { Send } from "lucide-react"
import HeadingText from "../heading-text"
import { STEPS } from "@/config/contents"

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-body py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-xl text-center lg:mb-28">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
            How it works
          </p>
          <HeadingText subtext="From first idea to first bite, we make it effortless.">
            Order your custom cake
          </HeadingText>
        </div>

        {/* Steps Container */}
        <div className="relative mx-auto max-w-7xl pb-8 pt-8 lg:pb-28 lg:pt-12">
          {/* Mobile Vertical Timeline Line (Hidden on Desktop) */}
          <div className="absolute bottom-10 left-1/2 top-10 -z-10 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-slate-200 lg:hidden" />

          {/* Grid: 1 column on mobile/tablet, 5 columns on desktop */}
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-20">
            {STEPS.map((step, index) => {
              // Create the wave effect by alternating vertical translation (Desktop only)
              // Evens (0, 2, 4) move up, Odds (1, 3) move down
              const isEven = index % 2 === 0
              const verticalOffset = isEven
                ? "lg:-translate-y-20"
                : "lg:translate-y-20"

              return (
                <div
                  key={step.id}
                  className={`group relative flex flex-col items-center text-center transition-transform duration-500 ${verticalOffset}`}
                >
                  {/* Wavy Dotted Connector with Paper Plane - Desktop only */}
                  {index < STEPS.length - 1 && (
                    <div
                      className={`pointer-events-none absolute left-[50%] top-1/2 -z-10 hidden lg:block ${
                        // Shorten the container on even steps so it stops at the left edge of the next circle
                        isEven
                          ? "w-[calc(100%-106px)]"
                          : "w-[calc(100%+1.5rem)]"
                      }`}
                    >
                      {isEven ? (
                        // Curve going DOWN
                        <div className="relative h-40 w-full">
                          <svg
                            className="absolute top-0 h-full w-full overflow-visible"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                          >
                            <path
                              d="M 0 81 C 50 160, 120 100, 150 120"
                              fill="none"
                              stroke="#cbd5e1"
                              strokeWidth="2"
                              strokeDasharray="6 6"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                          <div className="absolute left-[35%] top-[115%] -translate-x-1/2 -translate-y-1/2 rotate-[70deg] rounded-full bg-slate-50 p-1 text-slate-400 shadow-sm">
                            <Send className="h-3 w-3" />
                          </div>
                        </div>
                      ) : (
                        // Curve going UP
                        <div className="relative h-40 w-full -translate-y-full">
                          <svg
                            className="absolute bottom-0 h-full w-full overflow-visible"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                          >
                            <path
                              d="M 0 40 C 20 -80, 110 0, 120 0"
                              fill="none"
                              stroke="#cbd5e1"
                              strokeWidth="2"
                              strokeDasharray="6 6"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                          <div className="absolute left-[20%] top-[-10%] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] rounded-full bg-slate-50 p-1 text-slate-400 shadow-sm">
                            <Send className="h-3 w-3" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Circular Card */}
                  <div
                    className={`relative flex aspect-square w-full max-w-[260px] flex-col items-center justify-center rounded-full border-2 bg-white p-7 shadow-lg shadow-slate-200/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200 ${step.border}`}
                  >
                    {/* Icon */}
                    <div
                      className={`mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-8 ring-white transition-transform duration-500 group-hover:scale-110 ${step.color}`}
                    >
                      <step.icon className="h-6 w-6" strokeWidth={2} />
                    </div>

                    {/* Text Content */}
                    <h3 className="mb-2 font-serif text-lg font-bold leading-tight text-slate-800">
                      {step.title}
                    </h3>
                    <p className="line-clamp-3 px-2 text-xs leading-relaxed text-slate-500">
                      {step.description}
                    </p>

                    {/* Step label on border */}
                    <div
                      className={`absolute -bottom-4 whitespace-nowrap rounded-full border-2 bg-white px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 ${step.border}`}
                    >
                      {step.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
