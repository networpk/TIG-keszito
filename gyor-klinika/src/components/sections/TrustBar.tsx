type Stat = {
  value: string;
  label: string;
};

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  stats: Stat[];
  logosHeading: string;
  logos: ImageProps[];
};

export type TrustBarProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 3. szakasz — Bizalomsáv.
 * Relume Stats 8 + Logo 1 összevonva egyetlen, vékony sávvá: kulcsszámok és
 * elfogadott partnerek közvetlenül a hero alatt, hogy az első benyomás után
 * azonnal jöjjön a megerősítés — még görgetés előtt.
 */
export const TrustBar = (props: TrustBarProps) => {
  const { stats, logosHeading, logos } = {
    ...TrustBarDefaults,
    ...props,
  };
  return (
    <section className="scheme-light bg-scheme-background px-[5%] py-12 text-scheme-text md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="border-l border-scheme-border pl-6">
              <p className="mb-1 text-h3 font-bold md:text-h2">{stat.value}</p>
              <p className="text-small">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-scheme-border pt-8 md:mt-12">
          <p className="mb-6 text-small font-semibold">{logosHeading}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-start">
            {logos.map((logo, index) => (
              <img key={index} src={logo.src} alt={logo.alt} className="max-h-10 md:max-h-12" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustBarDefaults: Props = {
  stats: [
    { value: "30", label: "Rövid megnevezés" },
    { value: "30", label: "Rövid megnevezés" },
    { value: "30", label: "Rövid megnevezés" },
    { value: "30", label: "Rövid megnevezés" },
  ],
  logosHeading: "Elfogadott egészségpénztárak és minősítések",
  logos: [
    { src: "/placeholder-logo.svg", alt: "Partner logó 1" },
    { src: "/placeholder-logo.svg", alt: "Partner logó 2" },
    { src: "/placeholder-logo.svg", alt: "Partner logó 3" },
    { src: "/placeholder-logo.svg", alt: "Partner logó 4" },
  ],
};
