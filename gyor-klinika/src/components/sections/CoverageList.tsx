import { useMemo, useState } from "react";
import { Search } from "relume-icons";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export type CoverageRegion = {
  county: string;
  cities: string[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  regions: CoverageRegion[];
  note?: string;
  buttons: ButtonProps[];
};

export type CoverageListProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Országos lefedettség — az üzemorvosi szolgáltatás településlistája.
 *
 * A jelenlegi oldalon ez egyetlen, 85+ elemű felsorolás, amiben nehéz
 * megtalálni egy konkrét várost. Itt megyénként csoportosítva fut, és
 * kereshető: a HR-esnek jellemzően egy kérdése van — „a mi telephelyünkön
 * elérhető?".
 */
export const CoverageList = (props: CoverageListProps) => {
  const { tagline, heading, description, searchPlaceholder, regions, note, buttons } = {
    ...CoverageListDefaults,
    ...props,
  };

  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return regions;
    return regions
      .map((region) => ({
        ...region,
        cities: region.cities.filter(
          (city) =>
            city.toLowerCase().includes(normalized) ||
            region.county.toLowerCase().includes(normalized),
        ),
      }))
      .filter((region) => region.cities.length > 0);
  }, [query, regions]);

  const cityCount = regions.reduce((sum, region) => sum + region.cities.length, 0);

  return (
    <section className="scheme-light bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>

        <div className="mb-8 max-w-sm">
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            icon={<Search className="size-5 text-scheme-text" />}
          />
        </div>

        <p className="mb-6 text-small" aria-live="polite">
          {query.trim()
            ? `${results.reduce((sum, region) => sum + region.cities.length, 0)} település`
            : `${cityCount} település, ${regions.length} megyében`}
        </p>

        {results.length === 0 ? (
          <Card className="p-6 md:p-8">
            <p>
              <span className="font-semibold">{query}</span> nincs a listában. Ez nem jelenti azt,
              hogy nem tudjuk ellátni — új telephelyre is szerződünk, kérjen ajánlatot.
            </p>
          </Card>
        ) : (
          <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
            {results.map((region) => (
              <div key={region.county} className="mb-8 break-inside-avoid">
                <h3 className="mb-2 font-semibold">{region.county}</h3>
                <ul className="grid grid-cols-1 gap-y-1 text-small">
                  {region.cities.map((city) => (
                    <li key={city}>{city}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {note && <p className="mt-4 max-w-lg text-small">{note}</p>}

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

export const CoverageListDefaults: Props = {
  tagline: "Országos lefedettség",
  heading: "Hol tudjuk ellátni a munkavállalóit",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  searchPlaceholder: "Keressen településre",
  regions: [],
  buttons: [],
};
