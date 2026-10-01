import { Call, LocationOn, Mail, Schedule } from "relume-icons";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type Location = {
  city: string;
  name: string;
  address: string;
  phoneLabel: string;
  phoneNumber: string;
  email: string;
  hours: string;
  note?: string;
  buttons: ButtonProps[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  locations: Location[];
};

export type LocationCardsProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Egészségközpontok kártyái — a hálózat és a kapcsolat oldalon egyaránt.
 *
 * A jelenlegi oldalon a két telephely adata a fejlécben fut össze, ami
 * összekeverhető. Külön kártyán mindegyik saját címmel, telefonszámmal és
 * nyitvatartással szerepel, hogy ne kelljen kitalálni, melyik szám hová megy.
 */
export const LocationCards = (props: LocationCardsProps) => {
  const { tagline, heading, description, locations } = {
    ...LocationCardsDefaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {locations.map((location) => (
            <Card key={location.city} className="flex h-full flex-col p-6 md:p-8">
              <p className="text-small font-semibold">{location.city}</p>
              <h3 className="mt-1 mb-6 text-h4 font-bold">{location.name}</h3>

              <dl className="grid grid-cols-1 gap-y-4">
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <LocationOn className="size-6 text-scheme-text" />
                    <span className="sr-only">Cím</span>
                  </dt>
                  <dd>{location.address}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <Call className="size-6 text-scheme-text" />
                    <span className="sr-only">Telefon</span>
                  </dt>
                  <dd>
                    <a
                      href={`tel:${location.phoneNumber.replace(/\s/g, "")}`}
                      className="underline underline-offset-4"
                    >
                      {location.phoneLabel}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <Mail className="size-6 text-scheme-text" />
                    <span className="sr-only">E-mail</span>
                  </dt>
                  <dd>
                    <a href={`mailto:${location.email}`} className="underline underline-offset-4">
                      {location.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <Schedule className="size-6 text-scheme-text" />
                    <span className="sr-only">Nyitvatartás</span>
                  </dt>
                  <dd className="whitespace-pre-line">{location.hours}</dd>
                </div>
              </dl>

              {location.note && <p className="mt-6 text-small">{location.note}</p>}

              <div className="mt-auto flex flex-wrap gap-4 pt-8">
                {location.buttons.map((button, index) => (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LocationCardsDefaults: Props = {
  tagline: "Egészségközpontjaink",
  heading: "Hol talál minket",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  locations: [],
};
