import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/*
  Styleguide — a főoldal design rendszere egy lapon.

  Ez a Relume styleguide (sgb) mintája: a tipográfiai skála, a színsémák, a
  gombok, a form-elemek és a sarokkerekítések egy helyen, hogy a szövegezési és
  a tervezési fázisban ugyanarra a készletre lehessen hivatkozni. Ha itt
  átállítunk egy tokent (tailwind.config.js / index.css), az egész oldal követi.
*/

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="border-t border-scheme-border px-[5%] py-12 md:py-16">
    <div className="container">
      <h2 className="mb-8 text-h4 font-bold">{title}</h2>
      {children}
    </div>
  </section>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-1 items-baseline gap-2 border-b border-scheme-border py-4 md:grid-cols-[12rem_1fr] md:gap-8">
    <code className="text-small text-neutral">{label}</code>
    <div>{children}</div>
  </div>
);

export const Styleguide = () => {
  return (
    <main>
      <header className="px-[5%] py-16 md:py-24">
        <div className="container">
          <p className="mb-3 font-semibold">Styleguide</p>
          <h1 className="mb-5 text-h1 font-bold">Győri magánklinika — design rendszer</h1>
          <p className="max-w-lg text-medium">
            A főoldal minden szakasza ezekből az elemekből épül fel. A tokenek forrása a{" "}
            <code>tailwind.config.js</code> (tipográfia, színek, kerekítés) és az{" "}
            <code>index.css</code> (szekciónkénti színsémák).
          </p>
          <div className="mt-8">
            <Button asChild variant="secondary">
              <a href="#/">← Vissza a főoldalra</a>
            </Button>
          </div>
        </div>
      </header>

      <Section title="Tipográfia">
        <Row label="text-h1">
          <p className="text-h1 font-bold">Szakorvosi vizsgálat Győrben</p>
        </Row>
        <Row label="text-h2">
          <p className="text-h2 font-bold">Szakrendelések kategóriákba rendezve</p>
        </Row>
        <Row label="text-h3">
          <p className="text-h3 font-bold">Így zajlik egy vizsgálat</p>
        </Row>
        <Row label="text-h4">
          <p className="text-h4 font-bold">Konkrét panaszom van</p>
        </Row>
        <Row label="text-h5">
          <p className="text-h5 font-bold">Időpont egy héten belül</p>
        </Row>
        <Row label="text-h6">
          <p className="text-h6 font-bold">Elfogadott egészségpénztárak</p>
        </Row>
        <Row label="text-large">
          <p className="text-large">Dr. Kovács Eszter</p>
        </Row>
        <Row label="text-medium">
          <p className="text-medium">Szülész-nőgyógyász szakorvos, 22 év tapasztalattal.</p>
        </Row>
        <Row label="text-regular">
          <p>Alapértelmezett törzsszöveg — ezen a méreten fut a szakaszok leírása.</p>
        </Row>
        <Row label="text-small">
          <p className="text-small">Kiegészítő információ, jogi és árazási megjegyzések.</p>
        </Row>
        <Row label="text-tiny">
          <p className="text-tiny">Legkisebb méret — csak elvétve, címkékhez.</p>
        </Row>
      </Section>

      <Section title="Színsémák">
        <p className="mb-8 max-w-lg">
          Minden szakasz egy sémát kap. A sémát a szekción lévő <code>.scheme-*</code> osztály
          állítja, a komponensek pedig csak a <code>scheme-*</code> tokeneket használják — így egy
          szakasz átszínezéséhez nem kell hozzányúlni a komponenshez.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { name: "alap (:root)", className: "" },
            { name: ".scheme-light", className: "scheme-light" },
            { name: ".scheme-brand", className: "scheme-brand" },
          ].map((scheme) => (
            <div
              key={scheme.name}
              className={`${scheme.className} rounded-card border border-scheme-border bg-scheme-background p-6 text-scheme-text`}
            >
              <code className="text-small">{scheme.name}</code>
              <p className="mt-3 text-h6 font-bold">Szakasz címe</p>
              <p className="mt-2">Törzsszöveg ezen a háttéren.</p>
              <div className="mt-4 rounded-card border border-scheme-border bg-scheme-foreground p-3 text-small">
                scheme-foreground (kártya)
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button size="sm" variant={scheme.className === "scheme-brand" ? "alternate" : "default"}>
                  Elsődleges
                </Button>
                <Button
                  size="sm"
                  variant={scheme.className === "scheme-brand" ? "secondary-alt" : "secondary"}
                >
                  Másodlagos
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Márkaszínek">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {[
            "bg-brand-darkest",
            "bg-brand-darker",
            "bg-brand",
            "bg-brand-light",
            "bg-brand-lighter",
            "bg-brand-lightest",
            "bg-accent",
            "bg-accent-light",
            "bg-neutral-darkest",
            "bg-neutral",
            "bg-neutral-lighter",
            "bg-neutral-lightest",
          ].map((color) => (
            <div key={color}>
              <div className={`${color} h-16 rounded-card border border-scheme-border`} />
              <code className="mt-2 block text-tiny">{color}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Gombok">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Időpontfoglalás</Button>
          <Button variant="secondary">Teljes árlista</Button>
          <Button variant="link" size="link">
            Tovább
          </Button>
          <Button size="sm">Kicsi</Button>
          <Button disabled>Letiltott</Button>
        </div>
        <div className="scheme-brand mt-6 rounded-card bg-scheme-background p-6 text-scheme-text">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="alternate">Ajánlatot kérek</Button>
            <Button variant="secondary-alt">Céges szolgáltatások</Button>
            <Button variant="link-alt" size="link">
              Tovább
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Címkék és kártyák">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge>Megelőzés</Badge>
          <Badge variant="outline">Mozgásszervek</Badge>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="p-6">
            <p className="text-h6 font-bold">Kártya (rounded-card)</p>
            <p className="mt-2">Ezen fut a szűrőcsomag, a vélemény és a blogkártya is.</p>
          </Card>
          <Card className="p-6">
            <p className="text-h6 font-bold">Kép sarokkerekítése</p>
            <img
              src="/placeholder-landscape.svg"
              alt="Helykitöltő kép"
              className="mt-4 w-full rounded-image"
            />
          </Card>
        </div>
      </Section>

      <Section title="Űrlapelemek">
        <div className="grid max-w-lg grid-cols-1 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="sg-name">Név</Label>
            <Input id="sg-name" placeholder="Kovács Anna" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sg-phone">Telefonszám</Label>
            <Input id="sg-phone" type="tel" prefix="+36" placeholder="30 000 0000" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sg-message">Üzenet</Label>
            <Textarea id="sg-message" rows={4} placeholder="Miben segíthetünk?" />
          </div>
        </div>
      </Section>

      <Section title="Akkordeon (GYIK)">
        <Accordion type="multiple" className="max-w-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-medium">Kell beutaló a vizsgálathoz?</AccordionTrigger>
            <AccordionContent>
              Nem. Magánrendelésre beutaló nélkül is jöhet, bármelyik szakrendelésünkre.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-medium">
              Mennyi idő alatt kapok időpontot?
            </AccordionTrigger>
            <AccordionContent>A legtöbb szakrendelésre egy héten belül.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Szakaszritmus">
        <ul className="grid max-w-lg grid-cols-1 gap-3">
          <li>
            <code className="text-small">px-[5%]</code> — vízszintes margó minden szakaszon
          </li>
          <li>
            <code className="text-small">py-16 md:py-24 lg:py-28</code> — tartalmi szakaszok
          </li>
          <li>
            <code className="text-small">py-12 md:py-16 lg:py-20</code> — vékony sávok (bizalomsáv,
            logók, lábléc)
          </li>
          <li>
            <code className="text-small">container</code> — legfeljebb 80rem, középre zárva
          </li>
        </ul>
      </Section>
    </main>
  );
};
