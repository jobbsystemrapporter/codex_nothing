import clsx from "clsx";
import { useContext, type PropsWithChildren } from "react";
import { ThemeContext } from "../context/ThemeContext";

type TileProps = PropsWithChildren<{
  className?: string;
  light?: boolean;
}>;

export function Tile({ className, light: explicitLight, children }: TileProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;

  return (
    <div
      className={clsx(
        light ? "nothing-card-light" : "nothing-card",
        "w-full min-w-0 p-5 container-type-size",
        className
      )}
    >
      {children}
    </div>
  );
}
