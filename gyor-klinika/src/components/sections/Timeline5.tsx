"use client";

import { useRef } from "react";
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button, type ButtonProps } from "@/components/ui/button";

type TimelineItem = {
  heading: string;
  title: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  timelineItems: TimelineItem[];
};

export type Timeline5Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 7. szakasz — Hogyan zajlik nálunk.
 * Relume Timeline 5. A lépések görgetésre világosodnak ki, így a folyamat
 * végigolvasható — annak, aki még nem járt magánklinikán, ez a bizonytalanság
 * legfőbb oldószere közvetlenül a foglalás előtt.
 */
export const Timeline5 = (props: Timeline5Props) => {
  const { tagline, heading, description, buttons, timelineItems } = {
    ...Timeline5Defaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="relative z-10 w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
            <p className="text-medium">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid w-full max-w-lg auto-cols-fr grid-cols-[max-content_1fr] items-start justify-items-center">
          <div className="relative left-0 flex h-full w-8 flex-col items-center md:left-auto">
            <div className="absolute z-10 h-16 w-1 bg-gradient-to-b from-scheme-background to-transparent" />
            <div className="sticky top-0 mt-[-50vh] h-[50vh] w-[3px] bg-scheme-text" />
            <div className="h-full w-[3px] bg-scheme-text/15" />
            <div className="absolute bottom-0 z-0 h-16 w-1 bg-gradient-to-b from-transparent to-scheme-background" />
            <div className="absolute top-[-50vh] h-[50vh] w-full bg-scheme-background" />
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-y-8 sm:gap-12 md:gap-20">
            {timelineItems.map((item, index) => (
              <TimelineItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item }: { item: TimelineItem }) => {
  const circleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: circleRef,
    offset: ["start center", "start start"],
  });

  const backgroundColor = {
    backgroundColor: useTransform(
      scrollYProgress,
      [0, 0.5],
      ["var(--color-neutral)", "var(--color-scheme-text)"],
    ),
  };

  return (
    <div className="relative">
      <div className="absolute -ml-8 flex h-full w-8 items-start justify-center">
        <motion.div
          ref={circleRef}
          style={backgroundColor}
          className="z-20 mt-7 size-3.75 rounded-full shadow-[0_0_0_8px_var(--color-scheme-background)] md:mt-8"
        />
      </div>
      <div className="mt-4 ml-4 flex flex-col md:ml-12">
        <h3 className="mb-3 text-h4 font-bold md:mb-4">{item.heading}</h3>
        <h4 className="mb-3 text-h5 font-bold md:mb-4">{item.title}</h4>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export const Timeline5Defaults: Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  buttons: [{ title: "Button", variant: "secondary" }],
  timelineItems: [
    {
      heading: "Date",
      title: "Short heading here",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
};
