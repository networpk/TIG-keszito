import { Button, type ButtonProps } from "@/components/ui/button";
import { FacebookLogo, InstagramLogo, YoutubeLogo } from "relume-icons";

type ImageProps = {
  url?: string;
  src?: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type ColumnLinks = {
  title: string;
  links: Links[];
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type Props = {
  logo: ImageProps;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
  legalLinks: Links[];
  footerText?: string;
};

export type Footer14Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 18. szakasz — Footer.
 * Relume Footer 14. A hatoszlopos linkrács itt a teljes szakrendelés-listát is
 * viszi (SEO-célból), a felső sávban pedig még egyszer ott a foglalás.
 */
export const Footer14 = (props: Footer14Props) => {
  const { logo, heading, description, buttons, columnLinks, socialMediaLinks, legalLinks, footerText } =
    {
      ...Footer14Defaults,
      ...props,
    };

  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="lg:flex lg:items-start lg:justify-between">
          <div className="max-w-lg">
            <h2 className="mb-5 text-h3 font-bold md:mb-6">{heading}</h2>
            <p>{description}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8 lg:mt-0">
            {buttons.map((button, index) => (
              <Button key={index} {...button}>
                {button.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="py-12 md:py-18 lg:py-20">
          <div className="h-px w-full bg-scheme-border" />
        </div>
        <div className="mb-12 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-3 md:mb-18 md:gap-y-12 lg:mb-20 lg:grid-cols-6">
          {columnLinks.map((column, index) => (
            <div key={index} className="flex flex-col items-start justify-start">
              <h3 className="mb-2 font-semibold">{column.title}</h3>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="py-2 text-small">
                    <a href={link.url} className="flex items-center gap-3">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between pb-6 sm:flex-row sm:items-center md:pb-8">
          <a href={logo.url} className="text-h6 font-bold">
            {logo.src ? <img src={logo.src} alt={logo.alt} className="inline-block" /> : logo.alt}
          </a>
          <div className="mt-6 flex items-center gap-3 sm:mt-0">
            {socialMediaLinks.map((link, index) => (
              <a key={index} href={link.url} aria-label="Közösségi oldal">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-scheme-border" />
        <div className="flex flex-col-reverse items-start gap-4 pt-6 pb-4 text-small sm:flex-row sm:items-center sm:justify-between md:pt-8 md:pb-0">
          <p>{footerText}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link, index) => (
              <a key={index} href={link.url} className="underline">
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer14Defaults: Props = {
  logo: { url: "#", alt: "Klinika" },
  heading: "Medium length footer heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  buttons: [{ title: "Button" }],
  columnLinks: [],
  legalLinks: [],
  socialMediaLinks: [
    { url: "#", icon: <FacebookLogo className="size-6 text-scheme-text" /> },
    { url: "#", icon: <InstagramLogo className="size-6 text-scheme-text" /> },
    { url: "#", icon: <YoutubeLogo className="size-6 text-scheme-text" /> },
  ],
  footerText: "© 2026 Klinika. Minden jog fenntartva.",
};
