import { RelumeIcon } from "relume-icons";

type SectionProps = {
  icon?: React.ReactNode;
  heading: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  sections: SectionProps[];
};

export type Layout234Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 6. szakasz — Miért minket válasszon (USP-k).
 * Relume Layout 234, közös szekciófejléccel kiegészítve. Szándékosan
 * gombok nélkül: ez racionális döntéstámogatás, nem külön konverziós pont —
 * a cselekvés a következő szakaszokban jön.
 */
export const Layout234 = (props: Layout234Props) => {
  const { tagline, heading, description, sections } = { ...Layout234Defaults, ...props };
  return (
    <section className="scheme-light bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {sections.map((section, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-none">
                {section.icon ?? <RelumeIcon className="size-12 text-scheme-text" />}
              </div>
              <div>
                <h3 className="mb-3 text-h5 font-bold md:mb-4">{section.heading}</h3>
                <p>{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout234Defaults: Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  sections: [
    {
      heading: "Medium length section heading goes here",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      heading: "Medium length section heading goes here",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      heading: "Medium length section heading goes here",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
};
