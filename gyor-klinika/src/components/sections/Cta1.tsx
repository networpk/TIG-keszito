import { placeholders } from "@/assets/placeholders";
import { Button, type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  bullets: string[];
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Cta1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 13. szakasz — Vállalati / üzemorvosi sáv.
 * Relume CTA 1. Külön nyelv és külön CTA a HR-es döntéshozónak: itt nem
 * időpontfoglalás a következő lépés, hanem ajánlatkérés — más a döntési
 * folyamat és más az időtáv.
 */
export const Cta1 = (props: Cta1Props) => {
  const { tagline, heading, description, bullets, buttons, image } = {
    ...Cta1Defaults,
    ...props,
  };
  return (
    <section className="scheme-brand bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
            <p className="text-medium">{description}</p>
            <ul className="mt-6 grid grid-cols-1 gap-y-2">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex gap-3">
                  <span aria-hidden="true">—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <img src={image.src} className="w-full rounded-image object-cover" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Cta1Defaults: Props = {
  tagline: "Vállalatoknak",
  heading: "Medium length heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  bullets: [],
  buttons: [{ title: "Button", variant: "alternate" }],
  image: {
    src: placeholders.landscape,
    alt: "Relume placeholder image",
  },
};
