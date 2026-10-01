import { Button, type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Footer = {
  heading: string;
  description: string;
  button: ButtonProps;
};

type TeamMember = {
  image: ImageProps;
  name: string;
  jobTitle: string;
  description: string;
  profileUrl?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  teamMembers: TeamMember[];
  footerContent: Footer;
};

export type Team16Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 6. szakasz — Szakorvos(ok) bemutatása.
 * Relume Team 16 (kétoszlopos, nagyobb portréval). Az aloldalon csak az adott
 * szakterület orvosai szerepelnek, és a közösségimédia-ikonok helyén az orvos
 * saját aloldalára mutató link áll — itt erősebb a bizalmi hatás, mint a
 * főoldalon, mert a látogató már tudja, milyen szakértelmet keres.
 */
export const Team16 = (props: Team16Props) => {
  const { tagline, heading, description, teamMembers, footerContent } = {
    ...Team16Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start md:grid-flow-row md:gap-x-12 lg:gap-x-20">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
        <div className="mt-14 w-full max-w-md md:mt-20 lg:mt-24">
          <h3 className="mb-3 text-h4 font-bold md:mb-4">{footerContent.heading}</h3>
          <p className="text-medium">{footerContent.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <Button {...footerContent.button}>{footerContent.button.title}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ member }: { member: TeamMember }) => {
  return (
    <div className="grid grid-cols-1 items-start gap-5 sm:gap-y-6 md:grid-cols-2 md:gap-x-8">
      <div className="w-full overflow-hidden">
        <img
          src={member.image.src}
          alt={member.image.alt}
          className="aspect-square size-full rounded-image object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="mb-3 md:mb-4">
          <p className="text-large font-semibold">{member.name}</p>
          <p className="text-medium">{member.jobTitle}</p>
        </div>
        <p>{member.description}</p>
        {member.profileUrl && (
          <a href={member.profileUrl} className="mt-5 self-start underline underline-offset-4">
            Bemutatkozás és rendelési idő
          </a>
        )}
      </div>
    </div>
  );
};

export const Team16Defaults: Props = {
  tagline: "Orvosaink",
  heading: "Ki végzi a vizsgálatot",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  teamMembers: [],
  footerContent: {
    heading: "Kérdése van a vizsgálattal kapcsolatban?",
    description: "Hívjon minket, és a szakasszisztensünk válaszol.",
    button: { title: "Kapcsolat", variant: "secondary" },
  },
};
