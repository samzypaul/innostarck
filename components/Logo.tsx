import Link from "next/link";

type LogoProps = {
  large?: boolean;
};

export default function Logo({ large = false }: LogoProps) {
  return (
    <Link href="/" className={large ? "logo logo--lg" : "logo"} aria-label="InnoStarck — home">
      <svg width={large ? 34 : 32} height={large ? 34 : 32} viewBox="0 0 96 96" aria-hidden="true">
        <path
          fillRule="evenodd"
          fill="#18CBAE"
          d="M48 6 C50.5 36 60 45.5 90 48 C60 50.5 50.5 60 48 90 C45.5 60 36 50.5 6 48 C36 45.5 45.5 36 48 6 Z M48 40 C48.6 46 50 47.4 56 48 C50 48.6 48.6 50 48 56 C47.4 50 46 48.6 40 48 C46 47.4 47.4 46 48 40 Z"
        />
      </svg>
      <span>
        <span className="logo__inno">Inno</span>
        <span className="logo__starck">Starck</span>
      </span>
    </Link>
  );
}
