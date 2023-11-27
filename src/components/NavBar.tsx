import { Link } from "react-router-dom";
import logoSvg from "@app/assets/logo.svg";

type NavBarProps = {
  className?: string;
};

export default function NavBar({ className }: NavBarProps) {
  return (
    <nav
      className={`flex items-center justify-start bg-primary py-4 ${className}`}
    >
      <Link to="/">
        <img src={logoSvg} alt="logo" />
      </Link>
    </nav>
  );
}
