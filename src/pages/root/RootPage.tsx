import { Outlet } from "react-router-dom";
import NavBar from "@app/components/NavBar";

export default function RootPage() {
  return (
    <>
      <header>
        <NavBar className="sm:content-px md:content-px lg:content-px xl:content-px 2xl:content-px" />
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
