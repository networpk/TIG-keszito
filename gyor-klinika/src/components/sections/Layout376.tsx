import { ChevronRight } from "relume-icons";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { placeholders } from "@/assets/placeholders";

type ImageProps = {
  src: string;
  alt?: string;
};

type CardSmall = {
  heading: string;
  description: string;
  button: ButtonProps;
};

type CardBig = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  cardsSmall: CardSmall[];
  cardBig: CardBig;
};

export type Layout376Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 9. szakasz — Kapcsolódó / kiegészítő vizsgálatok.
 * Relume Layout 376: egy kiemelt kártya (a vizsgálatot tartalmazó csomag) és
 * mellette a kapcsolódó vizsgálatok. Nem csak kereszt-ajánlás: annak is segít,
 * aki rossz aloldalra tévedt, hogy egy kattintással megtalálja, amit keresett.
 */
export const Layout376 = (props: Layout376Props) => {
  const { tagline, heading, description, cardsSmall, cardBig } = {
    ...Layout376Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
            <p className="text-medium">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="flex flex-col items-stretch sm:col-span-2 sm:row-span-2">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-12">
              <div>
                <p className="mb-2 text-small font-semibold">{cardBig.tagline}</p>
                <h3 className="mb-5 text-h3 font-bold md:mb-6">{cardBig.heading}</h3>
                <p>{cardBig.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {cardBig.buttons.map((button, index) => (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={cardBig.image.src}
                alt={cardBig.image.alt}
                className="size-full object-cover"
              />
            </div>
          </Card>
          {cardsSmall.map((card, index) => (
            <Card key={index} className="flex flex-col">
              <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
                <div>
                  <h3 className="mb-2 text-h5 font-bold">{card.heading}</h3>
                  <p>{card.description}</p>
                </div>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <Button {...card.button}>{card.button.title}</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout376Defaults: Props = {
  tagline: "Kapcsolódó vizsgálatok",
  heading: "Ez is érdekelheti",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  cardsSmall: [],
  cardBig: {
    tagline: "Csomagban",
    heading: "Medium length section heading goes here",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    buttons: [
      { title: "Részletek", variant: "secondary" },
      {
        title: "Időpontfoglalás",
        variant: "link",
        size: "link",
        iconRight: <ChevronRight className="text-scheme-text" />,
      },
    ],
    image: { src: placeholders.landscape, alt: "Helykitöltő kép" },
  },
};
