import { Pill } from "../primitives/Pill";
import { Tile } from "../primitives/Tile";

export function ConnectivityPillsCard() {
  return (
    <Tile className="min-h-[170px] grid content-center gap-3 p-4">
      <Pill className="justify-center text-[12px] uppercase tracking-[0.08em]">Bluetooth</Pill>
      <Pill
        light
        className="justify-center text-[12px] uppercase tracking-[0.08em] text-[var(--card-light-text)]"
      >
        Mobile Data
      </Pill>
    </Tile>
  );
}
