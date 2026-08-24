"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Call, KeyboardArrowDown } from "relume-icons";
import { Card } from "@/components/ui/card";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Phone = {
  label: string;
  number: string;
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
  buttons: ButtonProps[];
  phone: Phone;
};

export type Navbar1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 1. szakasz — Header / sticky navigáció.
 * Relume Navbar 1, kiegészítve egy végig látható, kattintható telefonszámmal
 * és sticky pozicionálással, hogy a CTA az oldal bármely pontján elérhető legyen.
 */
export const Navbar1 = (props: Navbar1Props) => {
  const { logo, navLinks, buttons, phone } = {
    ...Navbar1Defaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  return (
    <section className="sticky top-0 z-[999] flex w-full items-center border-b border-scheme-border bg-scheme-background lg:min-h-18 lg:px-[5%]">
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <a href={logo.url} className="text-h6 font-bold whitespace-nowrap">
            {logo.src ? <img src={logo.src} alt={logo.alt} /> : logo.alt}
          </a>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            aria-label="Menü"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-scheme-text"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-scheme-text"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-scheme-text"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
        </div>
        <motion.div
          variants={{
            open: {
              height: "var(--height-open, 100dvh)",
            },
            close: {
              height: "var(--height-closed, 0)",
            },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          transition={{ duration: 0.4 }}
          className="overflow-auto px-[5%] lg:flex lg:items-center lg:overflow-visible lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          {navLinks.map((navLink, index) =>
            navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
              <SubMenu key={index} navLink={navLink} isMobile={isMobile} />
            ) : (
              <a
                key={index}
                href={navLink.url}
                className="block py-3 text-base whitespace-nowrap first:pt-7 lg:px-4 lg:py-2 first:lg:pt-2"
              >
                {navLink.title}
              </a>
            ),
          )}
          <div className="mt-6 flex flex-col items-center gap-4 lg:mt-0 lg:ml-4 lg:flex-row">
            <a
              href={`tel:${phone.number.replace(/\s/g, "")}`}
              className="flex w-full items-center justify-center gap-2 font-semibold whitespace-nowrap lg:w-auto"
            >
              <Call className="size-5 text-scheme-text" />
              {phone.label}
            </a>
            {buttons.map((button, index) => (
              <Button key={index} {...button} className="w-full lg:w-auto">
                {button.title}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SubMenu = ({ navLink, isMobile }: { navLink: NavLink; isMobile: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const MotionCard = isMobile ? motion.nav : motion.create(Card);

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <p
        role="button"
        className="flex w-full items-center justify-between gap-2 py-3 text-left text-base whitespace-nowrap lg:flex-none lg:justify-start lg:px-4 lg:py-2"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <KeyboardArrowDown className="text-scheme-text" />
        </motion.span>
      </p>
      {isDropdownOpen && (
        <AnimatePresence>
          <MotionCard
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="bg-scheme-background lg:absolute lg:z-50 lg:min-w-64 lg:p-2 lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((navLink, index) => (
              <a
                key={index}
                href={navLink.url}
                className="block py-3 pl-[5%] text-base lg:px-4 lg:py-2"
              >
                {navLink.title}
              </a>
            ))}
          </MotionCard>
        </AnimatePresence>
      )}
    </div>
  );
};

export const Navbar1Defaults: Props = {
  logo: {
    url: "#",
    src: "",
    alt: "Logo image",
  },
  navLinks: [
    { title: "Link One", url: "#" },
    { title: "Link Two", url: "#" },
    { title: "Link Three", url: "#" },
    {
      title: "Link Four",
      url: "#",
      subMenuLinks: [
        { title: "Link Five", url: "#" },
        { title: "Link Six", url: "#" },
        { title: "Link Seven", url: "#" },
      ],
    },
  ],
  buttons: [
    {
      title: "Button",
      variant: "secondary",
      size: "sm",
    },
    {
      title: "Button",
      size: "sm",
    },
  ],
  phone: {
    label: "+36 1 000 0000",
    number: "+3610000000",
  },
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
