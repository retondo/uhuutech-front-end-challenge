import { Outlet } from "react-router-dom";
import NavBar from "@app/components/NavBar";

export default function RootPage() {
  return (
    <>
      <header>
        <NavBar className="sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx" />
      </header>
      <main>
        <section>
          <div id="app-bar" />
        </section>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
