import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  active?: boolean;
  light?: boolean;
};

export function IconButton({
  icon,
  active,
  light,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        light ? "nothing-card-light" : "nothing-card",
        "h-12 w-12 rounded-full flex items-center justify-center transition-transform duration-150 hover:scale-[0.98]",
        active && "text-red-500",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
