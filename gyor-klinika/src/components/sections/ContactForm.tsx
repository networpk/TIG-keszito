import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  tagline: string;
  heading: string;
  description: string;
  topics: string[];
  note: string;
};

export type ContactFormProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Kapcsolat oldal — írásos megkeresés.
 *
 * Nem az elsődleges út: aki időpontot akar, a foglalóval vagy telefonon
 * gyorsabban végez, ezért az űrlap a telefonos elérhetőség UTÁN áll. Annak
 * való, akinek kérdése van, nem foglalni akar — ezért kérünk témát is, hogy a
 * megkeresés rögtön a megfelelő kollégához kerüljön.
 *
 * A küldés itt csak visszajelzést mutat: a valódi bekötés (levélküldés vagy
 * CRM) a fejlesztési fázis feladata.
 */
export const ContactForm = (props: ContactFormProps) => {
  const { tagline, heading, description, topics, note } = {
    ...ContactFormDefaults,
    ...props,
  };

  const [sent, setSent] = useState(false);

  return (
    <section className="scheme-light bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2 lg:gap-x-20">
        <div className="max-w-lg">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
          <p className="mt-6 text-small">{note}</p>
        </div>

        <Card className="p-6 md:p-8">
          {sent ? (
            <div role="status">
              <h3 className="mb-3 text-h5 font-bold">Köszönjük, megkaptuk</h3>
              <p>
                Egy munkanapon belül válaszolunk a megadott elérhetőségen. Ha sürgős, hívjon minket
                — hétköznap 7:00 és 19:00 között vesszük fel a telefont.
              </p>
              <div className="mt-6">
                <Button variant="secondary" onClick={() => setSent(false)}>
                  Új üzenet írása
                </Button>
              </div>
            </div>
          ) : (
            <form
              className="grid grid-cols-1 gap-6"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Név</Label>
                <Input id="contact-name" name="name" required autoComplete="name" />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone">Telefonszám</Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    prefix="+36"
                    autoComplete="tel"
                    placeholder="30 000 0000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">E-mail</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact-topic">Miben segíthetünk?</Label>
                <select
                  id="contact-topic"
                  name="topic"
                  className={cn(
                    "min-h-11 w-full rounded-form border border-scheme-border bg-scheme-background px-3 py-2",
                    "focus-visible:outline-none",
                  )}
                >
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact-message">Üzenet</Label>
                <Textarea id="contact-message" name="message" rows={5} required />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="contact-consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-1 size-5 shrink-0 rounded-checkbox border border-scheme-border"
                />
                <Label htmlFor="contact-consent" className="text-small font-normal">
                  Hozzájárulok, hogy a megkeresésem megválaszolásához kezeljék az adataimat.
                </Label>
              </div>

              <div>
                <Button type="submit">Üzenet küldése</Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
};

export const ContactFormDefaults: Props = {
  tagline: "Írjon nekünk",
  heading: "Kérdése van? Írja meg",
  description:
    "Írásos megkeresésre egy munkanapon belül válaszolunk. Időpontot foglalni gyorsabb online vagy telefonon.",
  topics: [
    "Kérdés egy vizsgálatról",
    "Időpont módosítása vagy lemondása",
    "Lelet, dokumentáció",
    "Számlázás, egészségpénztár",
    "Céges együttműködés, üzemorvosi ellátás",
    "Egyéb",
  ],
  note: "Sürgős, akut panasz esetén ne írjon: hívja a 112-t vagy a háziorvosi ügyeletet.",
};
