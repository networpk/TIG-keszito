import { Navbar1 } from "@/components/sections/Navbar1";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Footer14 } from "@/components/sections/Footer14";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import {
  BOOKING_URL,
  PHONE_LABEL,
  PHONE_NUMBER,
  footerColumns,
  footerText,
  legalLinks,
  navLinks,
} from "@/content/site";

type Crumb = { title: string; url?: string };

type Props = {
  crumbs: Crumb[];
  children: React.ReactNode;
};

/**
 * Minden aloldal közös kerete: sticky fejléc, breadcrumb, lábléc és a mobil
 * cselekvési sáv. Ezek oldalanként nem térnek el — a konzisztencia itt
 * önmagában bizalmi tényező —, ezért egy helyen élnek.
 */
export const PageShell = ({ crumbs, children }: Props) => {
  return (
    <>
      <Navbar1
        logo={{ url: "#/", src: "", alt: "Klinika Győr" }}
        navLinks={navLinks}
        phone={{ label: PHONE_LABEL, number: PHONE_NUMBER }}
        buttons={[{ title: "Időpontfoglalás", size: "sm" }]}
      />
      <Breadcrumb crumbs={[{ title: "Főoldal", url: "#/" }, ...crumbs]} />

      {children}

      <Footer14
        logo={{ url: "#/", alt: "Klinika Győr" }}
        heading="Kérdése van? Kezdjük egy időponttal."
        description="Hétköznap 7:00 és 19:00 között telefonon is elérhetők vagyunk."
        buttons={[{ title: "Időpontfoglalás" }, { title: PHONE_LABEL, variant: "secondary" }]}
        columnLinks={footerColumns}
        legalLinks={legalLinks}
        footerText={footerText}
      />

      <MobileActionBar
        phoneLabel="Hívás"
        phoneNumber={PHONE_NUMBER}
        bookingLabel="Időpontfoglalás"
        bookingUrl={BOOKING_URL}
      />
      <div className="h-20 lg:hidden" />
    </>
  );
};
