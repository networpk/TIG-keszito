import { Button, type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  logos: ImageProps[];
  button: ButtonProps;
};

export type Logo5Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 12. szakasz — Egészségpénztárak és biztosítók.
 * Relume Logo 5, egy magyarázó mondattal és egy „hogyan használható” linkkel.
 * Sok páciensnél ez beengedő vagy kizáró ok, ezért nem maradhat egy alárendelt
 * menüpontban.
 */
export const Logo5 = (props: Logo5Props) => {
  const { heading, description, logos, button } = {
    ...Logo5Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mb-6 w-full max-w-lg md:mb-8">
          <h2 className="mb-3 text-h5 font-bold md:mb-4">{heading}</h2>
          <p>{description}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 pt-4 pb-2 sm:items-start sm:justify-start md:py-2">
          {logos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} className="max-h-12 md:max-h-14" />
          ))}
        </div>
        <div className="mt-8">
          {/* A hosszú linkszöveg mobilon törhessen — a Button alapból nowrap. */}
          <Button {...button} className="text-left whitespace-normal">
            {button.title}
          </Button>
        </div>
      </div>
    </section>
  );
};

export const Logo5Defaults: Props = {
  heading: "Elfogadott egészségpénztárak",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  logos: [],
  button: { title: "Részletek", variant: "link", size: "link" },
};
