import logoSvg from "@app/assets/logo.svg";

type NavBarProps = {
  className?: string;
};

export default function NavBar({ className }: NavBarProps) {
  return (
    <nav
      className={`flex items-center justify-start bg-primary py-4 ${className}`}
    >
      <img src={logoSvg} alt="logo" />
    </nav>
  );
}
