import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Tile } from "../primitives/Tile";

type PhotoFrameCardProps = {
  light?: boolean;
  src: string;
  alt: string;
};

export function PhotoFrameCard({ src, alt, light: explicitLight }: PhotoFrameCardProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  return (
    <Tile light={light} className="min-h-[170px] p-2">
      <img
        alt={alt}
        className="h-full min-h-[150px] w-full rounded-[16px] object-cover"
        loading="lazy"
        src={src}
      />
    </Tile>
  );
}
