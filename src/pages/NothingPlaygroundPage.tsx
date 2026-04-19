import type { ReactNode } from "react";
import { useState } from "react";
import {
  Bell,
  Bluetooth,
  Cloud,
  MicOff,
  Plus,
  Radio,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { WidgetGrid } from "../design/layout/WidgetGrid";
import { CircleTile } from "../design/primitives/CircleTile";
import { DotText } from "../design/primitives/DotText";
import { IconButton } from "../design/primitives/IconButton";
import { Label } from "../design/primitives/Label";
import { Pill } from "../design/primitives/Pill";
import { ProgressDots } from "../design/primitives/ProgressDots";
import { Tile } from "../design/primitives/Tile";
import { nothingColors } from "../design/tokens/colors";
import { nothingMotion } from "../design/tokens/motion";
import { nothingRadius } from "../design/tokens/radius";
import { nothingShadows } from "../design/tokens/shadows";
import { nothingSpacing } from "../design/tokens/spacing";
import { nothingTypography } from "../design/tokens/typography";
import { ActivityPulseCard } from "../design/widgets/ActivityPulseCard";
import { AnalogClockCard } from "../design/widgets/AnalogClockCard";
import { ClockCard } from "../design/widgets/ClockCard";
import { CoordinatesCircleCard } from "../design/widgets/CoordinatesCircleCard";
import { ConnectivityPillsCard } from "../design/widgets/ConnectivityPillsCard";
import { DayAgendaCard } from "../design/widgets/DayAgendaCard";
import { DotBarTimeCard } from "../design/widgets/DotBarTimeCard";
import { DotCountMiniCard } from "../design/widgets/DotCountMiniCard";
import { DotNumberBoardCard } from "../design/widgets/DotNumberBoardCard";
import { EventCard } from "../design/widgets/EventCard";
import { FlightStatusCompactCard } from "../design/widgets/FlightStatusCompactCard";
import { ForecastStripCard } from "../design/widgets/ForecastStripCard";
import { GmtDotCard } from "../design/widgets/GmtDotCard";
import { LiveWeatherAccentCard } from "../design/widgets/LiveWeatherAccentCard";
import { MarketDotsChartCard } from "../design/widgets/MarketDotsChartCard";
import { NowPlayingCard } from "../design/widgets/NowPlayingCard";
import { NumberLightCard } from "../design/widgets/NumberLightCard";
import { OverLimitTimerCard } from "../design/widgets/OverLimitTimerCard";
import { PairDeviceCard } from "../design/widgets/PairDeviceCard";
import { QuickNotesCard } from "../design/widgets/QuickNotesCard";
import { RecordCircleCard } from "../design/widgets/RecordCircleCard";
import { ScheduleCalendarCard } from "../design/widgets/ScheduleCalendarCard";
import { StatCard } from "../design/widgets/StatCard";
import { StepsStreakCard } from "../design/widgets/StepsStreakCard";
import { StorageCard } from "../design/widgets/StorageCard";
import { TempRangeCircleCard } from "../design/widgets/TempRangeCircleCard";
import { ToggleTile } from "../design/widgets/ToggleTile";
import { WeatherCard } from "../design/widgets/WeatherCard";
import { WeatherMatrixCard } from "../design/widgets/WeatherMatrixCard";
import { WeatherStatusCard } from "../design/widgets/WeatherStatusCard";
import { WeeklyMarksCard } from "../design/widgets/WeeklyMarksCard";
import { WorldTimeMapCard } from "../design/widgets/WorldTimeMapCard";
import { CompassRoseCard } from "../design/widgets/CompassRoseCard";

const tokenPreview = [
  `bg: ${nothingColors.bg}`,
  `surface: ${nothingColors.surface}`,
  `danger: ${nothingColors.danger}`,
  `spacing xl: ${nothingSpacing.xl}`,
  `radius lg: ${nothingRadius.lg}`,
  `motion normal: ${nothingMotion.normal}`,
  `shadow subtle: ${nothingShadows.subtle}`,
  `font body: ${nothingTypography.bodyFont}`,
];

type SlotProps = {
  code: string;
  span: string;
  children: ReactNode;
};

function Slot({ code, span, children }: SlotProps) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 self-start ${span}`}>
      <p className="nothing-label px-1">{code}</p>
      {children}
    </div>
  );
}

export default function NothingPlaygroundPage() {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const [shadow, setShadow] = useState<"on" | "off">("on");

  return (
    <WidgetGrid mode={mode} shadow={shadow}>
      <div className="md:col-span-12">
        <Tile className="p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <DotText value="PLAYGROUND" className="text-[26px] leading-[0.95] tracking-[0.02em]" />
              <p className="mt-2 text-[13px] text-[var(--text-muted)]">
                Symmetric layout with live clocks, live weather, and mode/shadow switching.
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <div className="flex gap-2">
                <button
                  className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.08em] ${
                    mode === "dark" ? "nothing-card-light text-[var(--card-light-text)]" : "nothing-card"
                  }`}
                  onClick={() => setMode("dark")}
                  type="button"
                >
                  Dark
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.08em] ${
                    mode === "light" ? "nothing-card-light text-[var(--card-light-text)]" : "nothing-card"
                  }`}
                  onClick={() => setMode("light")}
                  type="button"
                >
                  Light
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.08em] ${
                    shadow === "on" ? "nothing-card-light text-[var(--card-light-text)]" : "nothing-card"
                  }`}
                  onClick={() => setShadow("on")}
                  type="button"
                >
                  Shadow on
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.08em] ${
                    shadow === "off" ? "nothing-card-light text-[var(--card-light-text)]" : "nothing-card"
                  }`}
                  onClick={() => setShadow("off")}
                  type="button"
                >
                  Shadow off
                </button>
              </div>
            </div>
          </div>
        </Tile>
      </div>

      <Slot code="DNUMB-001" span="md:col-span-4">
        <DotNumberBoardCard />
      </Slot>
      <Slot code="DNUMB-002" span="md:col-span-4">
        <DotNumberBoardCard light />
      </Slot>
      <Slot code="LVWTH-003" span="md:col-span-4">
        <LiveWeatherAccentCard />
      </Slot>

      <Slot code="WSLOC-004" span="md:col-span-2">
        <WeatherStatusCard message="Location permission needed" variant="location" />
      </Slot>
      <Slot code="WSSUN-005" span="md:col-span-2">
        <WeatherStatusCard condition="Sunny day" temp="22" variant="sunny" />
      </Slot>
      <Slot code="WSSHW-006" span="md:col-span-2">
        <WeatherStatusCard condition="Showers" temp="14" variant="showers" />
      </Slot>
      <Slot code="WLLOC-007" span="md:col-span-2">
        <WeatherStatusCard light message="Location permission needed" variant="location" />
      </Slot>
      <Slot code="WLSUN-008" span="md:col-span-2">
        <WeatherStatusCard condition="Sunny day" light temp="22" variant="sunny" />
      </Slot>
      <Slot code="WLSHW-009" span="md:col-span-2">
        <WeatherStatusCard condition="Showers" light temp="14" variant="showers" />
      </Slot>

      <Slot code="CLKDG-010" span="md:col-span-3">
        <ClockCard live label="Local time" locale="en-US" note="SYNC MODE" noteTime="LIVE · 24/7" />
      </Slot>
      <Slot code="CLKAN-011" span="md:col-span-3">
        <AnalogClockCard live />
      </Slot>
      <Slot code="TMRNG-012" span="md:col-span-3">
        <TempRangeCircleCard high="15°" low="7°" />
      </Slot>
      <Slot code="STRAK-013" span="md:col-span-3">
        <StepsStreakCard light streak="3" totalSteps="5,543" />
      </Slot>

      <Slot code="QNOTE-014" span="md:col-span-6">
        <QuickNotesCard note="Two roads diverged in a yellow wood and sorry I could not travel both." />
      </Slot>
      <Slot code="DAGEN-015" span="md:col-span-6">
        <DayAgendaCard
          dayName="Monday"
          dayNumber="15"
          items={[
            { time: "2:00 PM", text: "Lunch at Miyamos Cafe" },
            { time: "3:45 PM", text: "Meeting with Ali for Nothing OS Designs" },
          ]}
        />
      </Slot>

      <Slot code="WMAPX-016" span="md:col-span-6">
        <WorldTimeMapCard
          items={[
            { city: "London", time: "1:00 PM" },
            { city: "New York", time: "9:00 PM" },
            { city: "Sydney", time: "12:00 AM" },
          ]}
        />
      </Slot>
      <Slot code="MRKET-017" span="md:col-span-6">
        <MarketDotsChartCard change="+2.5" changePct="0.017%" symbol="NASDAQ" value="$14,972" />
      </Slot>

      <Slot code="DBTIM-018" span="md:col-span-3">
        <DotBarTimeCard active={14} time="6h20" total={18} />
      </Slot>
      <Slot code="MUSIC-019" span="md:col-span-3">
        <NowPlayingCard artist="Jim Hall" track="Concerto" />
      </Slot>
      <Slot code="COORD-020" span="md:col-span-3">
        <CoordinatesCircleCard altitude="108 ft" lat="51°30'49.2”N" lng="0°05'30.4”W" />
      </Slot>
      <Slot code="PAIRD-021" span="md:col-span-3">
        <PairDeviceCard subtitle="New device" title="Pair" />
      </Slot>

      <Slot code="APLSE-022" span="md:col-span-4">
        <ActivityPulseCard activity="JOGGING" bpm="89" duration="00:06:19" steps="1283" />
      </Slot>
      <Slot code="WMARK-023" span="md:col-span-4">
        <WeeklyMarksCard
          marks={[
            { day: "SUN", value: "9H26", tone: "danger" },
            { day: "MON", value: "9H14", tone: "neutral" },
            { day: "TUE", value: "5H35", tone: "neutral" },
            { day: "WED", value: "5H16", tone: "neutral" },
            { day: "THU", value: "8H11", tone: "danger" },
            { day: "FRI", value: "6H34", tone: "danger" },
            { day: "SAT", value: "9H34", tone: "danger" },
          ]}
        />
      </Slot>
      <Slot code="FORCT-024" span="md:col-span-4">
        <ForecastStripCard
          city="TORONTO"
          days={[
            { day: "WED", high: "-3", low: "-6", icon: "☁" },
            { day: "THU", high: "-1", low: "-9", icon: "❄" },
            { day: "FRI", high: "-9", low: "-10", icon: "❄" },
            { day: "SAT", high: "-6", low: "-6", icon: "☁" },
            { day: "SUN", high: "-4", low: "-6", icon: "☁" },
            { day: "MON", high: "-4", low: "-6", icon: "☁" },
          ]}
          subtitle="Party Cloudy"
          temp="30°"
        />
      </Slot>

      <Slot code="QACTN-025" span="md:col-span-4">
        <Tile className="min-h-[200px] p-5">
          <Label>Quick actions</Label>
          <div className="mt-5 flex flex-wrap gap-3">
            <IconButton aria-label="Add" icon={<Plus className="h-5 w-5" strokeWidth={1.8} />} />
            <IconButton aria-label="Weather" icon={<Cloud className="h-5 w-5" strokeWidth={1.8} />} />
            <IconButton active aria-label="Do not disturb" icon={<Bell className="h-5 w-5" strokeWidth={1.8} />} />
            <IconButton aria-label="Mic access" icon={<MicOff className="h-5 w-5" strokeWidth={1.8} />} />
          </div>
          <div className="mt-5 grid gap-2">
            <Pill className="text-[11px] uppercase tracking-[0.08em]">Torch</Pill>
            <Pill light className="text-[11px] uppercase tracking-[0.08em] text-[var(--card-light-text)]">
              Data saver
            </Pill>
            <Pill className="text-[11px] uppercase tracking-[0.08em]">Hotspot</Pill>
          </div>
        </Tile>
      </Slot>
      <Slot code="TGGLS-026" span="md:col-span-4">
        <Tile className="min-h-[200px] p-5">
          <Label>Toggle tiles</Label>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <ToggleTile active icon={<Wifi className="h-5 w-5" strokeWidth={1.8} />} label="Wi-Fi" />
            <ToggleTile icon={<Bluetooth className="h-5 w-5" strokeWidth={1.8} />} label="Bluetooth" />
            <ToggleTile icon={<ShieldCheck className="h-5 w-5" strokeWidth={1.8} />} label="Secure" />
            <ToggleTile icon={<Radio className="h-5 w-5" strokeWidth={1.8} />} label="NFC" />
          </div>
        </Tile>
      </Slot>
      <Slot code="STORG-027" span="md:col-span-4">
        <StorageCard progress={12} total="256" used="78" />
      </Slot>

      <Slot code="CALND-028" span="md:col-span-6">
        <ScheduleCalendarCard
          activeDay={22}
          meetings={[
            { title: "Design session", location: "Meeting room A", time: "10:30–11:30" },
            { title: "Product meeting", location: "Video call", time: "15:30–16:00" },
          ]}
          month="JUNE"
        />
      </Slot>
      <Slot code="FLGST-029" span="md:col-span-3">
        <FlightStatusCompactCard
          gate="Ryanair Flight"
          route="STANSTED AIRPORT LONDON TO BERLIN"
          status="In 19 min"
          time="16:45 - 20:15"
        />
      </Slot>
      <Slot code="EVENT-030" span="md:col-span-3">
        <EventCard title="Team planning" time="13:00 – 13:45" secondary="Today" />
      </Slot>

      <Slot code="WMTX-031" span="md:col-span-3">
        <WeatherMatrixCard city="HONG KONG" condition="PARTY CLOUDY" temp="29°" />
      </Slot>
      <Slot code="WTHCR-032" span="md:col-span-3">
        <WeatherCard light temp="12°C" label="Stockholm" condition="Cloudy Day" />
      </Slot>
      <Slot code="LOCRD-033" span="md:col-span-3">
        <CircleTile className="min-h-[200px] border-0 bg-[var(--danger)] p-6 text-[var(--white)]">
          <div className="text-center">
            <Label className="text-[rgba(255,255,255,0.82)]">Location</Label>
            <DotText value="ACCESS" className="mt-3 text-[28px] leading-[0.95] tracking-[0.02em]" />
          </div>
        </CircleTile>
      </Slot>
      <Slot code="NUMLT-034" span="md:col-span-3">
        <NumberLightCard value="29" />
      </Slot>

      <Slot code="STATO-035" span="md:col-span-2">
        <StatCard label="Orders" value="143" accent />
      </Slot>
      <Slot code="STATE-036" span="md:col-span-2">
        <StatCard label="Teams" value="12" />
      </Slot>
      <Slot code="TOKNS-037" span="md:col-span-8">
        <Tile className="min-h-[200px] p-5">
          <Label>Token preview</Label>
          <div className="mt-5 grid gap-3">
            {tokenPreview.map((row) => (
              <p
                className="border-t border-[var(--border)] pt-3 text-[13px] leading-[1.5] text-[var(--text-muted)]"
                key={row}
              >
                {row}
              </p>
            ))}
          </div>
          <div className="mt-5">
            <ProgressDots active={6} total={10} />
          </div>
        </Tile>
      </Slot>

      <Slot code="OVLMT-038" span="md:col-span-2">
        <OverLimitTimerCard minutes="40" />
      </Slot>
      <Slot code="RECRD-039" span="md:col-span-2">
        <RecordCircleCard />
      </Slot>
      <Slot code="GMTDZ-040" span="md:col-span-2">
        <GmtDotCard />
      </Slot>
      <Slot code="DTCNT-041" span="md:col-span-2">
        <DotCountMiniCard value="43,465" />
      </Slot>
      <Slot code="CMPRS-042" span="md:col-span-2">
        <CompassRoseCard />
      </Slot>
      <Slot code="CNPIL-043" span="md:col-span-2">
        <ConnectivityPillsCard />
      </Slot>

      <Slot code="DOTWX-046" span="md:col-span-3">
        <WeatherMatrixCard city="SYDNEY" condition="CLOUDY" temp="18°" />
      </Slot>
      <Slot code="DOTWX-047" span="md:col-span-3">
        <WeatherMatrixCard city="LONDON" condition="SHOWERS" temp="12°" />
      </Slot>
    </WidgetGrid>
  );
}
