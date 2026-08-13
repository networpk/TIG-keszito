import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type PriceRow = {
  name: string;
  price: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  rows: PriceRow[];
  note: string;
  button: ButtonProps;
};

export type Pricing4Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 11. szakasz — Árak átláthatósága.
 * Relume Pricing 4 (egy kártya, középre zárt fejléc) tájékoztató árlistává
 * alakítva. A bizonytalan költség a legerősebb konverziós akadály: ha az árat
 * csak foglalás után lehet megtudni, a látogató inkább elmegy.
 */
export const Pricing4 = (props: Pricing4Props) => {
  const { tagline, heading, description, rows, note, button } = {
    ...Pricing4Defaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <Card className="px-6 py-8 md:p-8">
          <ul className="grid grid-cols-1">
            {rows.map((row, index) => (
              <li
                key={index}
                className="flex items-baseline justify-between gap-6 border-b border-scheme-border py-4 last:border-b-0"
              >
                <span>{row.name}</span>
                <span className="text-medium font-semibold whitespace-nowrap">{row.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small">{note}</p>
          <div className="mt-6 md:mt-8">
            <Button {...button} className="w-full">
              {button.title}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export const Pricing4Defaults: Props = {
  tagline: "Tagline",
  heading: "Áraink",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  rows: [],
  note: "",
  button: { title: "Teljes árlista", variant: "secondary" },
};
