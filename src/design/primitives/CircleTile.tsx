import clsx from "clsx";
import { useContext, type PropsWithChildren } from "react";
import { ThemeContext } from "../context/ThemeContext";

type CircleTileProps = PropsWithChildren<{
  className?: string;
  light?: boolean;
}>;

export function CircleTile({ className, light: explicitLight, children }: CircleTileProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;

  return (
    <div
      className={clsx(
        light ? "nothing-card-light" : "nothing-card",
        "flex w-full items-center justify-center rounded-full p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
