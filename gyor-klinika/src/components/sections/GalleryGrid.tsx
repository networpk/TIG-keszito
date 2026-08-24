import { useState } from "react";

import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: string;
  /** A széles képek két oszlopot foglalnak — így a rács nem lesz egyhangú. */
  wide?: boolean;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  allLabel: string;
  categories: { id: string; title: string }[];
  images: GalleryImage[];
};

export type GalleryGridProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Galéria — szűrhető képrács.
 *
 * A képek kategória szerint szűrhetők (rendelők, diagnosztika, várótér, csapat),
 * mert a látogatót jellemzően egy dolog érdekli: hova fog beülni, milyen
 * eszközzel vizsgálják. Minden képhez tartozik képaláírás — enélkül a galéria
 * csak dekoráció, aláírással viszont információt is hordoz.
 */
export const GalleryGrid = (props: GalleryGridProps) => {
  const { tagline, heading, description, allLabel, categories, images } = {
    ...GalleryGridDefaults,
    ...props,
  };

  const [active, setActive] = useState("all");
  const visible = active === "all" ? images : images.filter((image) => image.category === active);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Szűrés kategóriára">
          {[{ id: "all", title: allLabel }, ...categories].map((category) => (
            <button
              key={category.id}
              onClick={() => setActive(category.id)}
              aria-pressed={active === category.id}
              className={cn(
                "rounded-button border px-4 py-2 text-small transition-colors",
                active === category.id
                  ? "border-neutral-darkest bg-neutral-darkest text-white"
                  : "border-scheme-border text-scheme-text hover:bg-scheme-foreground",
              )}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className={cn("flex flex-col", image.wide && "sm:col-span-2")}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-image object-cover"
              />
              <figcaption className="mt-3 text-small">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GalleryGridDefaults: Props = {
  tagline: "Galéria",
  heading: "Nézzen körül nálunk",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  allLabel: "Összes",
  categories: [],
  images: [],
};
