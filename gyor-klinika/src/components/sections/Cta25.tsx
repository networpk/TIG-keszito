import { Button, type ButtonProps } from "@/components/ui/button";

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  note?: string;
};

export type Cta25Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 17. szakasz — Záró CTA sáv.
 * Relume CTA 25. Annak szól, aki végigolvasta az oldalt, de még nem kattintott:
 * ismételt foglalási gomb és telefonszám, közvetlenül a lábléc előtt.
 */
export const Cta25 = (props: Cta25Props) => {
  const { heading, description, buttons, note } = {
    ...Cta25Defaults,
    ...props,
  };
  return (
    <section className="scheme-brand bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
        <p className="text-medium">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
          {buttons.map((button, index) => (
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))}
        </div>
        {note && <p className="mt-6 text-small">{note}</p>}
      </div>
    </section>
  );
};

export const Cta25Defaults: Props = {
  heading: "Medium length heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  buttons: [{ title: "Button", variant: "alternate" }],
};
