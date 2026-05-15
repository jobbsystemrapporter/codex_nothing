import { type ReactNode } from "react";
import { Tile } from "./Tile";

type ThemedTileProps = {
  light?: boolean;
  children: ReactNode;
  className?: string;
};

export function ThemedTile({ light = true, children, className }: ThemedTileProps) {
  return (
    <Tile light={light} className={className}>
      {children}
    </Tile>
  );
}