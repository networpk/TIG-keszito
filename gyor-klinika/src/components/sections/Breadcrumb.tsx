import { ChevronRight } from "relume-icons";

type Crumb = {
  title: string;
  url?: string;
};

type Props = {
  crumbs: Crumb[];
};

export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav"> & Partial<Props>;

/**
 * 1. szakasz kiegészítése — breadcrumb.
 * A vizsgálat-aloldalra a látogató jellemzően keresőből érkezik, nem a
 * főoldalról: a breadcrumb mutatja meg, hol van a szakterületi hierarchiában,
 * és innen tud egy kattintással a kategória többi vizsgálatához lépni.
 */
export const Breadcrumb = (props: BreadcrumbProps) => {
  const { crumbs } = { ...BreadcrumbDefaults, ...props };

  return (
    <nav aria-label="Morzsamenü" className="border-b border-scheme-border px-[5%] py-3">
      <ol className="container flex flex-wrap items-center gap-x-1 gap-y-1 text-small">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {crumb.url && !isLast ? (
                <a href={crumb.url} className="hover:underline">
                  {crumb.title}
                </a>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="font-semibold">
                  {crumb.title}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="size-4 shrink-0 text-scheme-text/60" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export const BreadcrumbDefaults: Props = {
  crumbs: [{ title: "Főoldal", url: "#/" }],
};
