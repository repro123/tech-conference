import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "neutral" | "nav";
type ButtonSize = "sm" | "md" | "lg";
type ButtonElement = "button" | "a";

type ButtonProps = {
  as?: ButtonElement;
  children?: ReactNode;
  class?: string;
  className?: string;
  href?: string;
  size?: ButtonSize;
  style?: CSSProperties;
  variant?: ButtonVariant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "style">;

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 ",
  md: "px-5 py-2.5",
  lg: "px-6 py-3 ",
};

const baseClassName =
  "inline-flex items-center justify-center border bg-[var(--button-bg)] uppercase text-[var(--button-text)] border-[var(--button-border)] transition-all duration-300 hover:border-[var(--button-hover-border)] hover:bg-[var(--button-hover-bg)] hover:text-[var(--button-hover-text)] active:translate-x-1 active:translate-y-1 active:bg-[var(--button-active-bg)] active:shadow-none disabled:pointer-events-none disabled:opacity-60 active:border-dashed shadow-[2px_2px_0_var(--button-shadow)] hover:shadow-[2px_2px_0_var(--button-hover-shadow)]";

export default function Button({
  as,
  children,
  class: astroClassName,
  className,
  href,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const mergedClassName = [baseClassName, sizes[size], astroClassName, className].filter(Boolean).join(" ");

  if (href || as === "a") {
    return (
      <a className={mergedClassName} data-variant={variant} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={mergedClassName} data-variant={variant} type={type} {...props}>
      {children}
    </button>
  );
}
