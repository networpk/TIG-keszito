import { Badge } from "@/components/ui/badge";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "relume-icons";

type ImageProps = {
  src: string;
  alt?: string;
};

type BlogPost = {
  url: string;
  image: ImageProps;
  category: string;
  readTime: string;
  title: string;
  description: string;
  button: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  blogPosts: BlogPost[];
};

export type Blog40Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * 16. szakasz — Blog / edukációs tartalom.
 * Relume Blog 40. Tudatosan a fő konverziós szakaszok UTÁN: megtartja a SEO- és
 * szakértői pozicionálási értékét, de már nem versenyzik a foglalási szándékkal.
 */
export const Blog40 = (props: Blog40Props) => {
  const { tagline, heading, description, button, blogPosts } = {
    ...Blog40Defaults,
    ...props,
  };
  return (
    <section className="scheme-light bg-scheme-background px-[5%] py-16 text-scheme-text md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
            <p className="text-medium">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex size-full flex-col items-center justify-start">
              <a href={post.url} className="w-full">
                <img
                  src={post.image.src}
                  alt={post.image.alt}
                  className="aspect-[3/2] size-full object-cover"
                />
              </a>
              <div className="px-5 py-6 md:p-6">
                <div className="mb-3 flex w-full items-center justify-start md:mb-4">
                  <Badge className="mr-4">{post.category}</Badge>
                  <p className="inline text-small font-semibold">{post.readTime}</p>
                </div>
                <div className="flex w-full flex-col items-start justify-start">
                  <a className="mb-2 block" href={post.url}>
                    <h3 className="text-h5 font-bold">{post.title}</h3>
                  </a>
                  <p>{post.description}</p>
                  <Button
                    {...post.button}
                    className="mt-5 flex items-center justify-center gap-x-2 md:mt-6"
                  >
                    {post.button.title}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Button {...button} className="mt-12 md:mt-18 lg:mt-20">
            {button.title}
          </Button>
        </div>
      </div>
    </section>
  );
};

export const Blog40Defaults: Props = {
  tagline: "Blog",
  heading: "Szakértői tartalmak",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "Összes cikk", variant: "secondary" },
  blogPosts: [],
};

export const blogPostButton: ButtonProps = {
  title: "Tovább",
  variant: "link",
  size: "link",
  iconRight: <ChevronRight className="text-scheme-text" />,
};
