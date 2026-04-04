import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "solid" | "text";
  className?: string;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  variant = "solid",
  className = "",
  type = "button",
  external = false,
}: ButtonProps) {
  const classes = `btn btn--${variant} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <span className="btn__text">{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      <span className="btn__text">{children}</span>
    </button>
  );
}
