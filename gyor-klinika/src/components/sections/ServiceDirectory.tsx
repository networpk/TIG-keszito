import { useMemo, useState } from "react";
import { ChevronRight, Search } from "relume-icons";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DirectoryItem = {
  title: string;
  description: string;
  price?: string;
  url: string;
};

export type DirectoryCategory = {
  id: string;
  title: string;
  items: DirectoryItem[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  allLabel: string;
  categories: DirectoryCategory[];
};

export type ServiceDirectoryProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Szolgáltatások gyűjtőoldal — a teljes katalógus.
 *
 * A főoldal tabos szakrendelés-szekciója az áttekintésre való; ez itt a
 * gyűjtőoldal, ahol minden vizsgálat egyszerre kereshető és szűrhető. A kereső
 * a leírásban is keres, mert a látogató gyakran panaszt ír be, nem
 * szakrendelés-nevet.
 */
export const ServiceDirectory = (props: ServiceDirectoryProps) => {
  const { tagline, heading, description, searchPlaceholder, allLabel, categories } = {
    ...ServiceDirectoryDefaults,
    ...props,
  };

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return categories
      .filter((category) => activeCategory === "all" || category.id === activeCategory)
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            !normalized ||
            item.title.toLowerCase().includes(normalized) ||
            item.description.toLowerCase().includes(normalized),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query, activeCategory, categories]);

  const total = results.reduce((sum, category) => sum + category.items.length, 0);

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

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Szűrés szakterületre">
          {[{ id: "all", title: allLabel }, ...categories].map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
              className={cn(
                "rounded-button border px-4 py-2 text-small transition-colors",
                activeCategory === category.id
                  ? "border-neutral-darkest bg-neutral-darkest text-white"
                  : "border-scheme-border text-scheme-text hover:bg-scheme-foreground",
              )}
            >
              {category.title}
            </button>
          ))}
        </div>

        <p className="mb-6 text-small" aria-live="polite">
          {total} találat
        </p>

        {results.length === 0 ? (
          <Card className="p-6 md:p-8">
            <p>
              Nincs találat erre: <span className="font-semibold">{query}</span>. Próbálja más
              szóval, vagy hívjon minket — megmondjuk, melyik szakrendelés a megfelelő.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-y-12">
            {results.map((category) => (
              <div key={category.id}>
                <h3 className="mb-6 text-h5 font-bold">{category.title}</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item) => (
                    <Card key={item.title} className="flex h-full flex-col p-6">
                      <h4 className="mb-2 text-h6 font-bold">{item.title}</h4>
                      <p>{item.description}</p>
                      <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                        {item.price && <p className="text-small font-semibold">{item.price}</p>}
                        <a
                          href={item.url}
                          className="flex items-center gap-1 font-semibold hover:underline"
                        >
                          Részletek
                          <ChevronRight className="size-5 text-scheme-text" />
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const ServiceDirectoryDefaults: Props = {
  tagline: "Szakrendelések",
  heading: "Minden vizsgálatunk egy helyen",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  searchPlaceholder: "Keressen panaszra vagy vizsgálatra",
  allLabel: "Összes",
  categories: [],
};
