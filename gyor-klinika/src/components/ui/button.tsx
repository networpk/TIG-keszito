import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // A Relume alapértelmezése `whitespace-nowrap`; a hosszabb magyar feliratok
  // ettől kilógtak a 390 pixeles képernyőről, ezért itt törhet a szöveg.
  "inline-flex items-center justify-center gap-3 rounded-button text-center transition-all duration-200 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-neutral-darkest bg-neutral-darkest text-white hover:bg-brand-darker hover:border-brand-darker",
        alternate: "border border-white bg-white text-neutral-darkest hover:bg-neutral-lightest",
        secondary: "border border-scheme-border text-scheme-text hover:bg-scheme-foreground",
        "secondary-alt": "border border-white text-white hover:bg-white/10",
        link: "gap-2 text-scheme-text hover:underline",
        "link-alt": "gap-2 text-white hover:underline",
        ghost: "hover:bg-neutral-darkest hover:text-white",
        none: "",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-5 py-2",
        link: "p-0",
        icon: "size-10",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft && iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight && iconRight}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
