import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Call, LocationOn, Mail, Schedule } from "relume-icons";

type ImageProps = {
  src: string;
  alt?: string;
};

type LinkProps = {
  label: string;
  url: string;
};

type MapProps = {
  url: string;
  image: ImageProps;
};

type Contact = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: LinkProps;
  button?: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  contacts: Contact[];
  map: MapProps;
};

export type Contact14Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 14. szakasz — Elérhetőség és lokáció.
 * Relume Contact 14. Az eredeti komponens a gombot a "Office" címhez kötötte
 * (`contact.title === "Office"`); itt egyszerűen az dönt, hogy az adott
 * blokkhoz adtunk-e gombot vagy linket.
 */
export const Contact14 = (props: Contact14Props) => {
  const { tagline, heading, description, contacts, map } = {
    ...Contact14Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[0.5fr_1fr] md:gap-x-20 md:gap-y-16">
          <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-10">
            {contacts.map((contact, index) => (
              <div key={index}>
                <div className="mb-3 md:mb-4">{contact.icon}</div>
                <h3 className="mb-2 text-h6 font-bold">{contact.title}</h3>
                <p className="mb-2 whitespace-pre-line">{contact.description}</p>
                {contact.button ? (
                  <div className="mt-5 md:mt-6">
                    <Button {...contact.button}>{contact.button.title}</Button>
                  </div>
                ) : (
                  contact.link && (
                    <a className="underline" href={contact.link.url}>
                      {contact.link.label}
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
          <a href={map.url} className="block">
            <img
              src={map.image.src}
              alt={map.image.alt}
              className="h-[320px] w-full rounded-image object-cover md:h-[565px] lg:h-[516px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export const Contact14Defaults: Props = {
  tagline: "Kapcsolat",
  heading: "Hol talál minket",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  contacts: [
    {
      icon: <LocationOn className="size-8 text-scheme-text" />,
      title: "Cím",
      description: "9021 Győr, Minta utca 1.",
    },
    {
      icon: <Call className="size-8 text-scheme-text" />,
      title: "Telefon",
      description: "Hétköznap 7:00–19:00 között hívható.",
      link: { label: "+36 1 000 0000", url: "tel:+3610000000" },
    },
    {
      icon: <Mail className="size-8 text-scheme-text" />,
      title: "E-mail",
      description: "Írásos megkeresésre 1 munkanapon belül válaszolunk.",
      link: { label: "info@example.hu", url: "mailto:info@example.hu" },
    },
    {
      icon: <Schedule className="size-8 text-scheme-text" />,
      title: "Nyitvatartás",
      description: "H–P: 7:00–19:00\nSzo: 8:00–14:00",
    },
  ],
  map: {
    url: "#",
    image: {
      src: "/placeholder-map.svg",
      alt: "Térkép helye",
    },
  },
};
