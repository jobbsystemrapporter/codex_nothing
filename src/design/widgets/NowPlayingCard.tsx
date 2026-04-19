import { Tile } from "../primitives/Tile";

type NowPlayingCardProps = {
  track: string;
  artist: string;
};

export function NowPlayingCard({ track, artist }: NowPlayingCardProps) {
  return (
    <Tile className="min-h-[170px] p-4">
      <div className="flex items-start justify-between">
        <div className="nothing-card flex h-14 w-14 items-center justify-center rounded-[12px] text-[24px]">
          ♫
        </div>
        <div className="text-[22px] leading-none opacity-80">◓</div>
      </div>
      <p className="mt-7 text-[18px] leading-[1.2] tracking-[-0.02em]">{artist}</p>
      <p className="mt-1 text-[13px] leading-[1.5] text-[var(--text-muted)]">{track}</p>
      <div className="mt-3 h-[2px] bg-[var(--border)]" />
    </Tile>
  );
}
