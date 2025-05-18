"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselSlide {
  id: string
  image: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  align?: "left" | "center" | "right"
}

const carouselSlides: CarouselSlide[] = [
  {
    id: "slide1",
    image: "/placeholder.svg?height=600&width=1200",
    title: "Modern Furniture For Modern Homes",
    subtitle: "Find the perfect furniture to transform your space into a stylish and comfortable home.",
    buttonText: "Shop Now",
    buttonLink: "/shop/1",
    align: "left",
  },
  {
    id: "slide2",
    image: "/placeholder.svg?height=600&width=1200",
    title: "New Arrivals",
    subtitle: "Discover our latest collection of premium furniture pieces.",
    buttonText: "Explore Collection",
    buttonLink: "/shop/3",
    align: "center",
  },
  {
    id: "slide3",
    image: "/placeholder.svg?height=600&width=1200",
    title: "Summer Sale",
    subtitle: "Up to 40% off on selected items. Limited time offer.",
    buttonText: "Shop Sale",
    buttonLink: "/shop/5",
    align: "right",
  },
]

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const totalSlides = carouselSlides.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
    setIsAutoPlaying(false)
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isAutoPlaying, nextSlide])

  // Pause auto-play when user interacts with controls
  const handleControlInteraction = () => {
    setIsAutoPlaying(false)
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const getAlignmentClasses = (align: CarouselSlide["align"]) => {
    switch (align) {
      case "right":
        return "items-center justify-end text-right"
      case "center":
        return "items-center justify-center text-center"
      default:
        return "items-center justify-start text-left"
    }
  }

  return (
    <div
      className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40 flex">
              <div className={`container mx-auto px-4 flex ${getAlignmentClasses(slide.align)}`}>
                <div className="max-w-lg p-6 rounded-lg bg-black/20 backdrop-blur-sm">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
                  <p className="text-white/90 mb-6">{slide.subtitle}</p>
                  <Link href={slide.buttonLink}>
                    <Button size="lg" className="font-medium">
                      {slide.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
          onClick={() => {
            prevSlide()
            handleControlInteraction()
          }}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
          onClick={() => {
            nextSlide()
            handleControlInteraction()
          }}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50",
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
