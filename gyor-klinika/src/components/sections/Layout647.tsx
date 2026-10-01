import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "relume-icons";
import { placeholders } from "@/assets/placeholders";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
  features: string[];
  note?: string;
};

export type Layout647Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 3. szakasz — Kinek ajánlott / mikor van rá szükség.
 * Relume Layout 647. Két javítás az eredetihez képest: a felsorolás pipás
 * ikonokat kapott a sima listajelek helyett (itt minden sor egy „igen, ez rám
 * vonatkozik" jelzés), és az `aspect-squarerounded-image` elgépelés — hiányzó
 * szóköz két osztálynév között — helyre lett téve.
 */
export const Layout647 = (props: Layout647Props) => {
  const { tagline, heading, description, buttons, image, features, note } = {
    ...Layout647Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Card className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 md:p-8 lg:p-12">
            <p className="mb-2 text-small font-semibold">{tagline}</p>
            <h2 className="mb-5 text-h3 font-bold md:mb-6">{heading}</h2>
            <p className="mb-6 text-medium md:mb-8">{description}</p>
            <ul className="grid grid-cols-1 gap-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <Check className="size-6 shrink-0 text-scheme-text" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {note && <p className="mt-6 text-small">{note}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <img
              src={image.src}
              className="aspect-square size-full rounded-image object-cover"
              alt={image.alt}
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

export const Layout647Defaults: Props = {
  tagline: "Kinek ajánlott",
  heading: "Medium length section heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  buttons: [{ title: "Időpontfoglalás", variant: "secondary" }],
  image: {
    src: placeholders.portrait,
    alt: "Helykitöltő kép",
  },
  features: [],
};
