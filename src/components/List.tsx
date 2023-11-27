import { forwardRef } from "react";
import type { LegacyRef, PropsWithChildren, ReactElement } from "react";

type ListProps = {
  paginator: ReactElement;
  className?: string;
} & PropsWithChildren;

const List = forwardRef(
  (
    { children, className = "", paginator }: ListProps,
    ref: LegacyRef<HTMLElement>,
  ) => {
    return (
      <article className={className} ref={ref} role="list">
        <article role="grid" className="grid grid-cols-12 gap-4 py-7 md:gap-8">
          {children}
        </article>
        {paginator}
      </article>
    );
  },
);

export default List;
