import { Button, type ButtonProps } from "@/components/ui/button";

type Fact = {
  label: string;
  value: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  facts: Fact[];
};

export type Header47Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 2. szakasz — Hero (szolgáltatás-specifikus).
 * Relume Header 47, kiegészítve egy „egy pillantásra" adatsorral (ár, időtartam,
 * eredmény). Aki idáig eljut, már tudja, mit keres: a hero dolga a megerősítés,
 * nem a figyelemfelkeltés — ezért a CTA is a konkrét vizsgálatra szól, nem
 * általános időpontfoglalásra.
 */
export const Header47 = (props: Header47Props) => {
  const { tagline, heading, description, buttons, facts } = {
    ...Header47Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:gap-12 lg:gap-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="text-h1 font-bold">{heading}</h1>
          </div>

          <div className="w-full max-w-lg">
            <p className="text-medium">{description}</p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {facts.length > 0 && (
          <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-scheme-border pt-8 sm:grid-cols-3 md:mt-16">
            {facts.map((fact, index) => (
              <div key={index}>
                <dt className="text-small">{fact.label}</dt>
                <dd className="mt-1 text-h5 font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

export const Header47Defaults: Props = {
  tagline: "Szakrendelés",
  heading: "Short heading here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  buttons: [{ title: "Időpontfoglalás" }],
  facts: [],
};
