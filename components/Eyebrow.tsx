type EyebrowProps = {
  children: React.ReactNode;
  variant?: "accent" | "paper" | "muted";
  withLine?: boolean;
};

export default function Eyebrow({
  children,
  variant = "accent",
  withLine = true,
}: EyebrowProps) {
  const cls =
    variant === "paper"
      ? "eyebrow eyebrow--paper"
      : variant === "muted"
        ? "eyebrow eyebrow--muted"
        : "eyebrow";
  return (
    <span className={cls}>
      {withLine && <span className="eyebrow__line" aria-hidden="true" />}
      {children}
    </span>
  );
}
