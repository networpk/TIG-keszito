import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "relume-icons";

type PricingPlan = {
  planName: string;
  description: string;
  price: string;
  priceNote: string;
  recommendedFor?: string;
  features: string[];
  button: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  pricingPlans: PricingPlan[];
};

export type Pricing40Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 10. szakasz — Szűrőprogramok / csomagok.
 * Relume Pricing 40. A szűrőcsomag jól csomagolható, magasabb értékű termék,
 * ezért kap külön, összehasonlítható kártyás megjelenést a szakrendelések
 * listája helyett.
 */
export const Pricing40 = (props: Pricing40Props) => {
  const { tagline, heading, description, pricingPlans } = {
    ...Pricing40Defaults,
    ...props,
  };
  return (
    <section className="scheme-light bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingPlan key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingPlan = ({ plan }: { plan: PricingPlan }) => (
  <Card className="flex h-full flex-col justify-start px-6 py-8 md:p-8">
    <h3 className="mb-1 text-h6 font-bold">{plan.planName}</h3>
    <p>{plan.description}</p>
    <div className="my-6 h-px w-full shrink-0 bg-scheme-border md:my-8" />
    <p className="mb-2 text-h3 font-bold">{plan.price}</p>
    <p className="text-small">{plan.priceNote}</p>
    {plan.recommendedFor && <p className="mt-4 text-small">Ajánljuk: {plan.recommendedFor}</p>}
    <div className="mt-6 md:mt-8">
      <Button {...plan.button} className="w-full">
        {plan.button.title}
      </Button>
    </div>
    <div className="my-6 h-px w-full shrink-0 bg-scheme-border md:my-8" />
    <div className="grid grid-cols-1 gap-y-4 py-2">
      {plan.features.map((feature, index) => (
        <div key={index} className="flex self-start">
          <div className="mr-4 flex-none self-start">
            <Check className="size-6 text-scheme-text" />
          </div>
          <p>{feature}</p>
        </div>
      ))}
    </div>
  </Card>
);

export const Pricing40Defaults: Props = {
  tagline: "Tagline",
  heading: "Szűrőprogramok",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  pricingPlans: [],
};
