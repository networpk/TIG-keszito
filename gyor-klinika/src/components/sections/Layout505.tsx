import { useMemo, useState } from "react";
import { ChevronRight, Search } from "relume-icons";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Speciality = {
  title: string;
  url: string;
};

type CategoryContent = {
  heading: string;
  description: string;
  specialities: Speciality[];
  buttons: ButtonProps[];
};

type Tab = {
  value: string;
  trigger: string;
  content: CategoryContent;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  tabs: Tab[];
  defaultTabValue: string;
};

export type Layout505Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 5. szakasz — Szakrendelések áttekintés.
 * Relume Layout 505 (függőleges tabok kártyában). A tabok a szakterületi
 * kategóriák, a tab tartalma pedig az adott kategória szakrendeléseinek
 * linklistája — így a 40+ szakrendelés nem egyetlen listaként zúdul a
 * látogatóra. A kereső az egész listán szűr, kategóriahatáron át is.
 */
export const Layout505 = (props: Layout505Props) => {
  const { tagline, heading, description, searchPlaceholder, tabs, defaultTabValue } = {
    ...Layout505Defaults,
    ...props,
  };

  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return null;
    return tabs.flatMap((tab) =>
      tab.content.specialities
        .filter((speciality) => speciality.title.toLowerCase().includes(normalized))
        .map((speciality) => ({ ...speciality, category: tab.trigger })),
    );
  }, [query, tabs]);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
          <div className="mx-auto mt-6 max-w-sm md:mt-8">
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              icon={<Search className="size-5 text-scheme-text" />}
            />
          </div>
        </div>

        {matches ? (
          <Card className="p-6 md:p-8">
            {matches.length === 0 ? (
              <p>
                Nincs találat erre: <span className="font-semibold">{query}</span>. Nézze át a
                kategóriákat, vagy hívjon minket — segítünk megtalálni a megfelelő szakrendelést.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((speciality, index) => (
                  <li key={index}>
                    <a href={speciality.url} className="flex items-center gap-2 hover:underline">
                      <ChevronRight className="size-5 shrink-0 text-scheme-text" />
                      <span>{speciality.title}</span>
                      <span className="text-small text-neutral">({speciality.category})</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ) : (
          <Card>
            <Tabs
              defaultValue={defaultTabValue}
              orientation="vertical"
              className="relative grid auto-cols-fr grid-cols-1 md:grid-cols-[1fr_1.5fr]"
            >
              <TabsList className="relative grid h-full auto-cols-fr grid-cols-1 border-b border-scheme-border md:border-r md:border-b-0">
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={index}
                    value={tab.value}
                    className="items-start justify-start rounded-none border-0 border-b p-6 text-left text-h6 font-bold last-of-type:border-0 data-[state=active]:border-b-transparent data-[state=inactive]:border-scheme-border data-[state=inactive]:bg-scheme-background md:px-8"
                  >
                    {tab.trigger}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:animate-tabs"
                >
                  <CategoryCard tab={tab} />
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        )}
      </div>
    </section>
  );
};

const CategoryCard = ({ tab }: { tab: Tab }) => {
  return (
    <div className="flex h-full flex-col justify-center p-6 md:p-8 lg:p-12">
      <h3 className="mb-3 text-h4 font-bold md:mb-4">{tab.content.heading}</h3>
      <p>{tab.content.description}</p>
      <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {tab.content.specialities.map((speciality, index) => (
          <li key={index}>
            <a href={speciality.url} className="flex items-center gap-2 hover:underline">
              <ChevronRight className="size-5 shrink-0 text-scheme-text" />
              <span>{speciality.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
        {tab.content.buttons.map((button, index) => (
          <Button key={index} {...button}>
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Layout505Defaults: Props = {
  tagline: "Tagline",
  heading: "Short heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  searchPlaceholder: "Keresés",
  defaultTabValue: "tab-1",
  tabs: [
    {
      value: "tab-1",
      trigger: "Tab one",
      content: {
        heading: "Medium length section heading goes here",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        specialities: [
          { title: "Link one", url: "#" },
          { title: "Link two", url: "#" },
        ],
        buttons: [{ title: "Button", variant: "secondary" }],
      },
    },
  ],
};
