import { useMemo, useState } from "react";
import { Search } from "relume-icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export type PriceRow = {
  name: string;
  price: string;
  note?: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  rows: PriceRow[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  groups: PriceGroup[];
  note?: string;
};

export type PriceTableProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Árak oldal — a tételes árlista.
 *
 * A jelenlegi oldalon 40+ szakterület árai futnak egyetlen hosszú listában.
 * Itt kategóriánként összecsukható, és keresni is lehet benne: aki egy konkrét
 * vizsgálat áráért jött, ne kelljen görgetnie. Keresés közben minden találatot
 * tartalmazó csoport nyitva van, hogy a találat rögtön látszódjon.
 */
export const PriceTable = (props: PriceTableProps) => {
  const { tagline, heading, description, searchPlaceholder, groups, note } = {
    ...PriceTableDefaults,
    ...props,
  };

  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return groups;
    return groups
      .map((group) => ({
        ...group,
        rows: group.rows.filter(
          (row) =>
            row.name.toLowerCase().includes(normalized) ||
            group.title.toLowerCase().includes(normalized),
        ),
      }))
      .filter((group) => group.rows.length > 0);
  }, [query, groups]);

  const openItems = query.trim() ? results.map((group) => group.id) : undefined;

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
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

        {results.length === 0 ? (
          <Card className="p-6 md:p-8">
            <p>
              Nincs találat erre: <span className="font-semibold">{query}</span>. Az árlista nem
              tartalmaz minden ritkább vizsgálatot — ilyenkor hívjon minket, és pontos árat mondunk.
            </p>
          </Card>
        ) : (
          <Accordion type="multiple" value={openItems} className="w-full">
            {results.map((group) => (
              <AccordionItem key={group.id} value={group.id}>
                <AccordionTrigger className="text-medium md:py-5">
                  <span className="flex items-baseline gap-3">
                    {group.title}
                    <span className="text-small font-normal text-neutral">
                      {group.rows.length} tétel
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  <ul className="grid grid-cols-1">
                    {group.rows.map((row) => (
                      <li
                        key={row.name}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-scheme-border py-3 last:border-b-0"
                      >
                        <span>
                          {row.name}
                          {row.note && <span className="block text-small">{row.note}</span>}
                        </span>
                        <span className="font-semibold whitespace-nowrap tabular-nums">
                          {row.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {note && <p className="mt-8 max-w-lg text-small">{note}</p>}
      </div>
    </section>
  );
};

export const PriceTableDefaults: Props = {
  tagline: "Árlista",
  heading: "Áraink szakterületenként",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  searchPlaceholder: "Keressen vizsgálatra",
  groups: [],
};
