import { ChevronRight } from "relume-icons";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type Fund = {
  name: string;
  logo: string;
  url: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  funds: Fund[];
  note?: string;
  buttons: ButtonProps[];
};

export type FundGridProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Elfogadott egészségpénztárak és biztosítók.
 *
 * Nem logófal: minden pénztár neve ki van írva és a saját oldalára mutat.
 * A látogató konkrét kérdésre keres választ — „az enyém köztük van?" —, és egy
 * felismerhetetlen logónál a név gyorsabban megválaszolja ezt.
 */
export const FundGrid = (props: FundGridProps) => {
  const { tagline, heading, description, funds, note, buttons } = {
    ...FundGridDefaults,
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

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {funds.map((fund) => (
            <li key={fund.name}>
              <Card className="flex h-full items-center gap-4 p-4">
                <img src={fund.logo} alt="" aria-hidden="true" className="h-10 w-auto shrink-0" />
                <a href={fund.url} className="font-semibold hover:underline">
                  {fund.name}
                </a>
              </Card>
            </li>
          ))}
        </ul>

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

export const FundGridDefaults: Props = {
  tagline: "Partnereink",
  heading: "Elfogadott egészségpénztárak",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  funds: [],
  buttons: [
    {
      title: "Nincs köztük az Öné? Hívjon minket",
      variant: "link",
      size: "link",
      iconRight: <ChevronRight className="text-scheme-text" />,
    },
  ],
};
