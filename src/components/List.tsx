import { forwardRef } from "react";
import type { LegacyRef, PropsWithChildren, ReactElement } from "react";

type ListProps = {
  paginator: ReactElement;
  loading: boolean;
} & PropsWithChildren;

const List = forwardRef(
  ({ children, paginator }: ListProps, ref: LegacyRef<HTMLElement>) => {
    return (
      <article
        ref={ref}
        role="list"
        className="sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx"
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
