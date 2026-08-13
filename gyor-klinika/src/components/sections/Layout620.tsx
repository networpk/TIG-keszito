import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight, RelumeIcon } from "relume-icons";

type ListItem = {
  icon: React.ReactNode;
  heading: string;
  description: string;
  buttons?: ButtonProps[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  listItems: ListItem[];
  buttons: ButtonProps[];
};

export type Layout620Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 4. szakasz — Célközönség-elágazás.
 * Relume Layout 620. Az eredeti komponens a defaultokat a propok UTÁN terítette
 * szét (`{...props, ...Defaults}`), ami elnyelte az átadott tartalmat — itt
 * megfordítva, hogy a propok legyenek az erősebbek.
 *
 * Minden oszlop külön CTA-t kap, mert a három út döntési folyamata más:
 * foglalás / tájékozódás / ajánlatkérés.
 */
export const Layout620 = (props: Layout620Props) => {
  const { tagline, heading, description, listItems, buttons } = {
    ...Layout620Defaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>

        <div className="grid grid-cols-1 border-t border-scheme-border md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-8 md:border-t">
          {listItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col border-b border-scheme-border py-6 last:border-b-0 md:border-b-0 md:py-8">
                <div className="mb-6 flex md:mb-8">{item.icon}</div>
                <h3 className="mb-5 text-h4 font-bold md:mb-6">{item.heading}</h3>
                <p>{item.description}</p>
                {item.buttons && (
                  <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-auto md:pt-6">
                    {item.buttons.map((button, buttonIndex) => (
                      <Button key={buttonIndex} {...button}>
                        {button.title}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {index < listItems.length - 1 && (
                <div className="hidden h-full w-px bg-scheme-border md:block" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 md:mt-10 lg:mt-12">
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

export const Layout620Defaults: Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  listItems: [
    {
      icon: <RelumeIcon className="size-12" />,
      heading: "Medium length section heading goes here",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <RelumeIcon className="size-12" />,
      heading: "Medium length section heading goes here",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <RelumeIcon className="size-12" />,
      heading: "Medium length section heading goes here",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
  buttons: [
    {
      title: "Button",
      variant: "link",
      size: "link",
      iconRight: <ChevronRight className="text-scheme-text" />,
    },
  ],
};
