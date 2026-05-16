import { ClockCard } from "../design/widgets/ClockCard";
import { AnalogClockCard } from "../design/widgets/AnalogClockCard";
import { LiveWeatherAccentCard } from "../design/widgets/LiveWeatherAccentCard";
import { QuickNotesCard } from "../design/widgets/QuickNotesCard";
import { ActivityPulseCard } from "../design/widgets/ActivityPulseCard";
import { BatterySegmentsCard } from "../design/widgets/BatterySegmentsCard";
import { NetworkTrendCard } from "../design/widgets/NetworkTrendCard";
import { NowPlayingEqualizerCard } from "../design/widgets/NowPlayingEqualizerCard";
import { ScheduleCalendarCard } from "../design/widgets/ScheduleCalendarCard";
import { MarketDotsChartCard } from "../design/widgets/MarketDotsChartCard";
import { CoordinatesCircleCard } from "../design/widgets/CoordinatesCircleCard";
import { StorageCard } from "../design/widgets/StorageCard";
import { WeatherMatrixCard } from "../design/widgets/WeatherMatrixCard";
import { WorldTimeMapCard } from "../design/widgets/WorldTimeMapCard";
import { MemorySegmentsCard } from "../design/widgets/MemorySegmentsCard";
import { WeatherCard } from "../design/widgets/WeatherCard";
import { DayAgendaCard } from "../design/widgets/DayAgendaCard";
import { EventCard } from "../design/widgets/EventCard";
import { NowPlayingCard } from "../design/widgets/NowPlayingCard";
import { StepsStreakCard } from "../design/widgets/StepsStreakCard";
import { OverLimitTimerCard } from "../design/widgets/OverLimitTimerCard";
import { LimitRedCard } from "../design/widgets/LimitRedCard";
import { DotBarTimeCard } from "../design/widgets/DotBarTimeCard";
import { NumberLightCard } from "../design/widgets/NumberLightCard";
import { DotNumberBoardCard } from "../design/widgets/DotNumberBoardCard";
import { StatusPillsCard } from "../design/widgets/StatusPillsCard";
import { FlightStatusCompactCard } from "../design/widgets/FlightStatusCompactCard";
import { ForecastStripCard } from "../design/widgets/ForecastStripCard";
import { WeeklyMarksCard } from "../design/widgets/WeeklyMarksCard";
import { TempRangeCircleCard } from "../design/widgets/TempRangeCircleCard";
import { PhotoFrameCard } from "../design/widgets/PhotoFrameCard";
import { PairDeviceCard } from "../design/widgets/PairDeviceCard";
import { QuickSettingsListCard } from "../design/widgets/QuickSettingsListCard";
import { StorageMultiRowCard } from "../design/widgets/StorageMultiRowCard";
import { GmtDotCard } from "../design/widgets/GmtDotCard";
import { StatCard } from "../design/widgets/StatCard";
import { ConnectivityPillsCard } from "../design/widgets/ConnectivityPillsCard";
import { CompassRoseCard } from "../design/widgets/CompassRoseCard";
import { RecordCircleCard } from "../design/widgets/RecordCircleCard";
import { DotCountMiniCard } from "../design/widgets/DotCountMiniCard";
import { WeatherStatusCard } from "../design/widgets/WeatherStatusCard";
import { ToggleTile } from "../design/widgets/ToggleTile";
import { CalculatorCard } from "../design/widgets/CalculatorCard";
import { StopwatchCard } from "../design/widgets/StopwatchCard";
import { VolumeSliderCard } from "../design/widgets/VolumeSliderCard";
import { BrightnessSliderCard } from "../design/widgets/BrightnessSliderCard";
import { CpuMonitorCard } from "../design/widgets/CpuMonitorCard";
import { CryptoTickerCard } from "../design/widgets/CryptoTickerCard";
import { AlarmListCard } from "../design/widgets/AlarmListCard";
import { ScreenTimeCard } from "../design/widgets/ScreenTimeCard";
import { PomodoroCard } from "../design/widgets/PomodoroCard";
import { DiceRollCard } from "../design/widgets/DiceRollCard";
import { Tile } from "../design/primitives/Tile";
import { Label } from "../design/primitives/Label";

import { Wifi, Bluetooth, ShieldCheck, Radio } from "lucide-react";
import { useState } from "react";

type RegistryProps = {
  type: string;
  light?: boolean;
};

function QuickSettingsDemo({ light }: { light?: boolean }) {
  const [items, setItems] = useState([
    { id: "wifi", name: "Wi-Fi", meta: "STUDIO 5G", enabled: true },
    { id: "bluetooth", name: "Bluetooth", meta: "3 DEVICES", enabled: true },
    { id: "darkmode", name: "Dark Mode", meta: "SYSTEM", enabled: true },
  ]);
  return (
    <QuickSettingsListCard
      light={light}
      items={items}
      onToggle={(id, next) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, enabled: next } : i)))}
    />
  );
}

function ToggleTileDemo() {
  const [tiles, setTiles] = useState({ wifi: true, bluetooth: false, secure: false, nfc: false });
  return (
    <Tile className="min-h-[200px] p-5">
      <Label>Toggle tiles</Label>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <ToggleTile active={tiles.wifi} icon={<Wifi className="h-5 w-5" strokeWidth={1.8} />} label="Wi-Fi" onToggle={() => setTiles((p) => ({ ...p, wifi: !p.wifi }))} />
        <ToggleTile active={tiles.bluetooth} icon={<Bluetooth className="h-5 w-5" strokeWidth={1.8} />} label="Bluetooth" onToggle={() => setTiles((p) => ({ ...p, bluetooth: !p.bluetooth }))} />
        <ToggleTile active={tiles.secure} icon={<ShieldCheck className="h-5 w-5" strokeWidth={1.8} />} label="Secure" onToggle={() => setTiles((p) => ({ ...p, secure: !p.secure }))} />
        <ToggleTile active={tiles.nfc} icon={<Radio className="h-5 w-5" strokeWidth={1.8} />} label="NFC" onToggle={() => setTiles((p) => ({ ...p, nfc: !p.nfc }))} />
      </div>
    </Tile>
  );
}

export function WidgetRegistry({ type, light }: RegistryProps) {
  switch (type) {
    case "ClockCard": return <ClockCard light={light} live label="Local time" locale="en-US" note="SYNC MODE" noteTime="LIVE · 24/7" />;
    case "AnalogClockCard": return <AnalogClockCard light={light} live />;
    case "LiveWeatherAccentCard": return <LiveWeatherAccentCard />;
    case "QuickNotesCard": return <QuickNotesCard light={light} note="Two roads diverged in a yellow wood and sorry I could not travel both." />;
    case "ActivityPulseCard": return <ActivityPulseCard light={light} activity="JOGGING" bpm="89" duration="00:06:19" steps="1283" />;
    case "BatterySegmentsCard": return <BatterySegmentsCard light={light} active={17} eta="4H 23M" value="87" />;
    case "NetworkTrendCard": return <NetworkTrendCard light={light} delta="12 MB/S" value="248" />;
    case "NowPlayingEqualizerCard": return <NowPlayingEqualizerCard light={light} artist="Kavinsky" end="04:47" genre="Outrun" progress={58} start="02:34" title="Nightcall" />;
    case "ScheduleCalendarCard": return <ScheduleCalendarCard light={light} activeDay={22} month="JUNE" meetings={[{ title: "Design session", location: "Meeting room A", time: "10:30–11:30" }, { title: "Product meeting", location: "Video call", time: "15:30–16:00" }]} />;
    case "MarketDotsChartCard": return <MarketDotsChartCard light={light} change="+2.5" changePct="0.017%" symbol="NASDAQ" value="$14,972" />;
    case "CoordinatesCircleCard": return <CoordinatesCircleCard light={light} lat={'51°30\'49.2"N'} lng={'0°05\'30.4"W'} altitude="108 ft" />;
    case "StorageCard": return <StorageCard used="78" total="256" progress={12} />;
    case "WeatherMatrixCard": return <WeatherMatrixCard light={light} city="HONG KONG" condition="PARTY CLOUDY" temp="29°" />;
    case "WorldTimeMapCard": return <WorldTimeMapCard items={[{ city: "London", time: "1:00 PM" }, { city: "New York", time: "9:00 PM" }, { city: "Sydney", time: "12:00 AM" }]} />;
    case "MemorySegmentsCard": return <MemorySegmentsCard light={light} activeSegments={13} value="12.4" used="12.4" total="16" />;
    case "WeatherCard": return <WeatherCard light={light} temp="12°C" label="Stockholm" condition="Cloudy Day" />;
    case "DayAgendaCard": return <DayAgendaCard light={light} dayName="Monday" dayNumber="15" items={[{ time: "2:00 PM", text: "Lunch at Miyamos Cafe" }, { time: "3:45 PM", text: "Meeting with Ali for Nothing OS Designs" }]} />;
    case "EventCard": return <EventCard light={light} title="Team planning" time="13:00 – 13:45" secondary="Today" />;
    case "NowPlayingCard": return <NowPlayingCard track="Concerto" artist="Jim Hall" />;
    case "StepsStreakCard": return <StepsStreakCard light={light} streak="3" totalSteps="5,543" />;
    case "OverLimitTimerCard": return <OverLimitTimerCard minutes="40" />;
    case "LimitRedCard": return <LimitRedCard value="85" subtitle="Limit reached" />;
    case "DotBarTimeCard": return <DotBarTimeCard time="6h20" total={18} active={14} />;
    case "NumberLightCard": return <NumberLightCard light={light} value="29" />;
    case "DotNumberBoardCard": return <DotNumberBoardCard light={light} />;
    case "StatusPillsCard": return <StatusPillsCard light={light} pills={[{ label: "CONNECTED", tone: "green" }, { label: "SYNCED", tone: "default" }, { label: "2 UPDATES", tone: "orange" }, { label: "V2.1.4", tone: "default" }]} />;
    case "FlightStatusCompactCard": return <FlightStatusCompactCard route="STANSTED AIRPORT LONDON TO BERLIN" status="In 19 min" gate="Ryanair Flight" time="16:45 - 20:15" />;
    case "ForecastStripCard": return <ForecastStripCard city="Stockholm" temp="14°" subtitle="Mostly cloudy" days={[{ day: "TUE", high: "14°", low: "8°" }, { day: "WED", high: "16°", low: "10°" }, { day: "THU", high: "12°", low: "6°" }, { day: "FRI", high: "10°", low: "4°" }, { day: "SAT", high: "11°", low: "5°" }]} />;
    case "WeeklyMarksCard": return <WeeklyMarksCard light={light} marks={[{ day: "SUN", value: "9H26", tone: "danger" }, { day: "MON", value: "9H14", tone: "neutral" }, { day: "TUE", value: "5H35", tone: "neutral" }, { day: "WED", value: "5H16", tone: "neutral" }, { day: "THU", value: "8H11", tone: "danger" }, { day: "FRI", value: "6H34", tone: "danger" }, { day: "SAT", value: "9H34", tone: "danger" }]} />;
    case "TempRangeCircleCard": return <TempRangeCircleCard light={light} high="15°" low="7°" />;
    case "PhotoFrameCard": return <PhotoFrameCard light={light} src="" alt="Demo" />;
    case "PairDeviceCard": return <PairDeviceCard title="Pair" subtitle="New device" />;
    case "QuickSettingsListCard": return <QuickSettingsDemo light={light} />;
    case "StorageMultiRowCard": return <StorageMultiRowCard light={light} capacityLabel="128 GB" rows={[{ name: "SYSTEM", total: 128, used: 48 }, { name: "MEDIA", total: 128, used: 23 }, { name: "APPS", tone: "orange", total: 128, used: 52 }]} />;
    case "GmtDotCard": return <GmtDotCard light={light} />;
    case "StatCard": return <StatCard label="Orders" value="143" accent />;
    case "ConnectivityPillsCard": return <ConnectivityPillsCard />;
    case "CompassRoseCard": return <CompassRoseCard />;
    case "RecordCircleCard": return <RecordCircleCard />;
    case "DotCountMiniCard": return <DotCountMiniCard value="43465" />;
    case "WeatherStatusCard": return <WeatherStatusCard light={light} variant="sunny" condition="Sunny day" temp="22" />;
    case "ToggleTile": return <ToggleTileDemo />;
    case "CalculatorCard": return <CalculatorCard light={light} />;
    case "StopwatchCard": return <StopwatchCard light={light} />;
    case "VolumeSliderCard": return <VolumeSliderCard light={light} />;
    case "BrightnessSliderCard": return <BrightnessSliderCard light={light} />;
    case "CpuMonitorCard": return <CpuMonitorCard light={light} />;
    case "CryptoTickerCard": return <CryptoTickerCard light={light} />;
    case "AlarmListCard": return <AlarmListCard light={light} />;
    case "ScreenTimeCard": return <ScreenTimeCard light={light} />;
    case "PomodoroCard": return <PomodoroCard light={light} />;
    case "DiceRollCard": return <DiceRollCard light={light} />;
    default: return <div className="p-4 text-[12px] text-[var(--text-muted)]">Unknown: {type}</div>;
  }
}
