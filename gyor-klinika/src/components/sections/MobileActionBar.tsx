import { Button } from "@/components/ui/button";
import { Call } from "relume-icons";

type Props = {
  phoneLabel: string;
  phoneNumber: string;
  bookingLabel: string;
  bookingUrl: string;
};

export type MobileActionBarProps = React.ComponentPropsWithoutRef<"div"> & Partial<Props>;

/**
 * Szakaszokon átívelő elem — mobil lebegő cselekvési sáv.
 * A forgalom nagyobbik része mobilról érkezik, ezért a két elsődleges művelet
 * (hívás, foglalás) a képernyő alján végig kéznél van. Asztali nézetben rejtve:
 * ott a sticky fejléc viszi ugyanezt.
 */
export const MobileActionBar = (props: MobileActionBarProps) => {
  const { phoneLabel, phoneNumber, bookingLabel, bookingUrl } = {
    ...MobileActionBarDefaults,
    ...props,
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[998] border-t border-scheme-border bg-scheme-background p-3 lg:hidden">
      <div className="flex items-center gap-3">
        <Button variant="secondary" asChild className="flex-1">
          <a href={`tel:${phoneNumber.replace(/\s/g, "")}`}>
            <Call className="size-5 text-scheme-text" />
            {phoneLabel}
          </a>
        </Button>
        <Button asChild className="flex-1">
          <a href={bookingUrl}>{bookingLabel}</a>
        </Button>
      </div>
    </div>
  );
};

export const MobileActionBarDefaults: Props = {
  phoneLabel: "Hívás",
  phoneNumber: "+3610000000",
  bookingLabel: "Időpontfoglalás",
  bookingUrl: "#idopontfoglalas",
};
