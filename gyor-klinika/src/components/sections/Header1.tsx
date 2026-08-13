import { placeholders } from "@/assets/placeholders";
import { Button, type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  secondaryLink?: { label: string; url: string };
  image: ImageProps;
};

export type Header1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 2. szakasz — Hero.
 * Relume Header 1: egy konkrét ígéret, egy elsődleges CTA, és egy halkabb,
 * másodlagos link a vállalati szegmensnek. A kép statikus (gyors első betöltés),
 * az imagefilm lejjebb, a bemutatkozó szekcióban kap helyet.
 */
export const Header1 = (props: Header1Props) => {
  const { heading, description, buttons, secondaryLink, image } = {
    ...Header1Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-5 text-h1 font-bold md:mb-6">{heading}</h1>
            <p className="text-medium">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
            {secondaryLink && (
              <p className="mt-6 text-small">
                <a href={secondaryLink.url} className="underline underline-offset-4">
                  {secondaryLink.label}
                </a>
              </p>
            )}
          </div>
          <div>
            <img
              src={image.src}
              className="w-full rounded-image object-cover"
              alt={image.alt}
              width={640}
              height={480}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header1Defaults: Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
  image: {
    src: placeholders.portrait,
    alt: "Relume placeholder image",
  },
};
