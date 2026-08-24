import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Description, Payments, Timer } from "relume-icons";

type Fact = {
  icon?: React.ReactNode;
  label: string;
  value: string;
  detail?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  facts: Fact[];
  note?: string;
  buttons: ButtonProps[];
};

export type KeyFactsProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 7. szakasz — Ár, időtartam, eredmény átfutási ideje.
 * Szándékosan a bizalomépítés (orvosbemutatás) után és a záró CTA előtt:
 * idáig érve a látogató már bízik a szolgáltatásban, így az ár inkább
 * megerősítés, mint elrettentés. Ha ez az információ hiányzik, sokan inkább
 * elhagyják az oldalt, mint hogy időpontot kérjenek pusztán az árért.
 */
export const KeyFacts = (props: KeyFactsProps) => {
  const { tagline, heading, description, facts, note, buttons } = {
    ...KeyFactsDefaults,
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {facts.map((fact, index) => (
            <Card key={index} className="p-6 md:p-8">
              <div className="mb-5 md:mb-6">{fact.icon ?? defaultIcons[index % 3]}</div>
              <p className="text-small">{fact.label}</p>
              <p className="mt-1 text-h3 font-bold">{fact.value}</p>
              {fact.detail && <p className="mt-3">{fact.detail}</p>}
            </Card>
          ))}
        </div>
        {note && <p className="mt-8 max-w-lg text-small">{note}</p>}
        <div className="mt-8 flex flex-wrap gap-4">
          {buttons.map((button, index) => (
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

const defaultIcons = [
  <Payments key="price" className="size-10 text-scheme-text" />,
  <Timer key="duration" className="size-10 text-scheme-text" />,
  <Description key="result" className="size-10 text-scheme-text" />,
];

export const KeyFactsDefaults: Props = {
  tagline: "Ár és időtartam",
  heading: "Mennyibe kerül és mennyi ideig tart",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  facts: [],
  buttons: [],
};
