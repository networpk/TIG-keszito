"use client";

import { useState, useEffect } from "react";
import React from "react";
import clsx from "clsx";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { StarFull } from "relume-icons";

type TestimonialProps = {
  rating?: number;
  description: string;
  treatment: string;
  author: {
    name: string;
    source: string;
  };
};

type Props = {
  heading: string;
  description: string;
  ratingSummary?: string;
  testimonials: TestimonialProps[];
};

export type Testimonial49Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 9. szakasz — Páciensvélemények.
 * Relume Testimonial 49, kép nélküli változatban: a kártyán a csillagos
 * értékelés, a vélemény, és — a hitelesség kedvéért — az elvégzett kezelés
 * megnevezése és a forrás (pl. Google) szerepel.
 */
export const Testimonial49 = (props: Testimonial49Props) => {
  const { heading, description, ratingSummary, testimonials } = {
    ...Testimonial49Defaults,
    ...props,
  };

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
          {ratingSummary && (
            <div className="mt-6 flex items-center gap-3">
              <Stars count={5} />
              <p className="font-semibold">{ratingSummary}</p>
            </div>
          )}
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent className="ml-0">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="basis-[95%] pr-6 pl-0 sm:basis-[80%] md:basis-1/2 md:pr-8 lg:basis-1/3"
              >
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-between">
            <div className="mt-5 flex w-full items-start justify-start">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  aria-label={`${index + 1}. vélemény`}
                  onClick={() => api?.scrollTo(index)}
                  className={clsx("mx-[3px] inline-block size-2 rounded-full", {
                    "bg-scheme-text": current === index + 1,
                    "bg-scheme-text/20": current !== index + 1,
                  })}
                />
              ))}
            </div>
            <div className="flex items-end justify-end gap-4">
              <CarouselPrevious className="static top-0 right-0 size-12 -translate-y-0" />
              <CarouselNext className="static top-0 right-0 size-12 -translate-y-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const Stars = ({ count }: { count: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, index) => (
      <StarFull key={index} className="size-6 text-scheme-text" />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps }) => {
  return (
    <Card className="flex h-full flex-col p-6 md:p-8">
      <div className="mb-5 md:mb-6">
        <Stars count={testimonial.rating ?? 5} />
      </div>
      <p className="text-medium">„{testimonial.description}”</p>
      <div className="mt-auto pt-5 md:pt-6">
        <p className="font-semibold">{testimonial.author.name}</p>
        <p className="text-small">
          {testimonial.treatment} · {testimonial.author.source}
        </p>
      </div>
    </Card>
  );
};

export const Testimonial49Defaults: Props = {
  heading: "Páciensvélemények",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  testimonials: [],
};
