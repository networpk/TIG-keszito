import { Card } from "@/components/ui/card";
import { Check, Close } from "relume-icons";

type Props = {
  tagline: string;
  heading: string;
  description: string;
  todo: string[];
  avoid: string[];
  note?: string;
};

export type PreparationProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 5. szakasz — Felkészülés a vizsgálatra.
 * Két oszlop: mit hozzon és mit kerüljön. Tudatosan a foglalás ELŐTT áll:
 * ha ez az információ hiányzik, a páciens vagy nem mer foglalni, vagy
 * felkészületlenül érkezik — mindkettő konverziós veszteség.
 */
export const Preparation = (props: PreparationProps) => {
  const { tagline, heading, description, todo, avoid, note } = {
    ...PreparationDefaults,
    ...props,
  };

  return (
    <section className="scheme-light bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <Card className="p-6 md:p-8">
            <h3 className="mb-5 text-h5 font-bold md:mb-6">Erre lesz szükség</h3>
            <ul className="grid grid-cols-1 gap-y-3">
              {todo.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <Check className="size-6 shrink-0 text-scheme-text" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6 md:p-8">
            <h3 className="mb-5 text-h5 font-bold md:mb-6">Ezt kerülje a vizsgálat előtt</h3>
            <ul className="grid grid-cols-1 gap-y-3">
              {avoid.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <Close className="size-6 shrink-0 text-scheme-text" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        {note && <p className="mt-8 max-w-lg text-small">{note}</p>}
      </div>
    </section>
  );
};

export const PreparationDefaults: Props = {
  tagline: "Felkészülés",
  heading: "Így készüljön a vizsgálatra",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  todo: [],
  avoid: [],
};
