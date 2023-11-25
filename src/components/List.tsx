import { forwardRef } from "react";
import type { LegacyRef, PropsWithChildren, ReactElement } from "react";

type ListProps = {
  paginator: ReactElement;
  loading: boolean;
} & PropsWithChildren;

const List = forwardRef(
  (
    { children, loading = false, paginator }: ListProps,
    ref: LegacyRef<HTMLElement>,
  ) => {
    if (loading) {
      return <p className="text-center">Carregando...</p>;
    }

    return (
      <article
        ref={ref}
        role="list"
        className="sm:content-px md:content-px lg:content-px xl:content-px content-px"
      >
        <article role="grid" className="grid grid-cols-12 gap-8 py-7">
          {children}
        </article>
        {paginator}
      </article>
    );
  },
);

export default List;
