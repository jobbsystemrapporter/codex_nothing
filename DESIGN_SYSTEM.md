# Nothing Design System — Universal AI Reference

> **Använd denna fil** när du ska bygga eller ändra widgets. Innehåller konkreta kodmallar, tokens, och exempel.

---

## Snabbstart — Skapa en ny widget (kopiera & klistra in)

```tsx
// src/design/widgets/MyWidgetCard.tsx
import { Tile } from "../primitives/Tile";
import { Label } from "../primitives/Label";
import { useWidgetTheme } from "../hooks/useWidgetTheme";

type MyWidgetCardProps = {
  value: string;
  light?: boolean;
};

export function MyWidgetCard({ value, light: explicitLight }: MyWidgetCardProps) {
  const light = useWidgetTheme(explicitLight);

  return (
    <Tile light={light} className="flex flex-col gap-3">
      <Label>MY WIDGET</Label>
      <p className="text-[28px] @min-[300px]:text-[36px] @min-[360px]:text-[48px] leading-[0.9]">
        {value}
      </p>
    </Tile>
  );
}
```

**Registrera widgeten** i `src/components/WidgetRegistry.tsx`:
```tsx
case "MyWidgetCard": return <MyWidgetCard value="Hello" light={light} />;
```

**Lägg till demo** i `src/pages/NothingPlaygroundPage.tsx`:
```tsx
<WidgetCard code="MYWID-001">
  <WidgetRegistry type="MyWidgetCard" />
</WidgetCard>
```

---

## Färg-tokens (CSS-variabler)

| Token | Mörkt tema | Ljust tema | Användning |
|-------|-----------|-----------|------------|
| `--bg` | `#0a0a0a` | `#f5f5f5` | App-bakgrund |
| `--surface` | `#141414` | `#ffffff` | Ytor |
| `--surface-2` | `#1e1e1e` | `#f0f0f0` | Kortbakgrund |
| `--surface-3` | `#2a2a2a` | `#e5e5e5` | Hover-ytor |
| `--text` | `#f5f5f5` | `#111111` | Primär text |
| `--text-muted` | `#888888` | `#666666` | Sekundär text |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | Kantlinjer |
| `--danger` | `#ff0000` | `#ff0000` | Alert / active / status |
| `--radius-lg` | `24px` | `24px` | Kort-rundning |

**Använd alltid tokens — aldrig hårdkodade färger.**

```tsx
✅ bg-[var(--surface-2)] text-[var(--text)]
❌ bg-[#1e1e1e] text-white
```

---

## Typografi-regler

| Element | Font | Storlek | Användning |
|---------|------|---------|------------|
| Etiketter | Inter / Space Grotesk | `11-13px` uppercase, `tracking-[0.12em]` | Widget-titlar |
| Metrics (siffror) | Doto | `28-96px` (container-query-baserat) | Klockor, temperatur, procent |
| Brödtext | Inter | `13-15px` | Beskrivningar, notiser |
| Kod / mono | Space Mono | `12-14px` | Tekniska värden |

**Doto får ENDAST användas för:**
- Klockor och timers
- Korta siffror/metrics (temperatur, batteri %)
- Små etiketter (max 3-4 ord)

**Använd INTE Doto för:**
- Brödtext
- Långa beskrivningar
- Widget-titlar

---

## Primitives — färdiga komponenter

### Tile (kort)
```tsx
import { Tile } from "../primitives/Tile";

<Tile light={light} className="flex flex-col gap-4">
  {/* content */}
</Tile>
```
- Automatisk `nothing-card` / `nothing-card-light` styling
- `container-type: size` för container queries
- Default padding: `20px` (desktop), `16px` (mobil)

### Label (widget-titel)
```tsx
import { Label } from "../primitives/Label";

<Label>WEATHER</Label>
```
- Auto-stylar: `11px uppercase tracking-[0.12em]`
- Färg anpassas efter tema

### DotText (dot-matrix text)
```tsx
import { DotText } from "../primitives/DotText";

<DotText value="10:30" className="text-[28px] @min-[300px]:text-[48px]" />
```
- Använder Doto-fonten
- Perfekt för klockor och siffror

### IconButton
```tsx
import { IconButton } from "../primitives/IconButton";

<IconButton icon={<Wifi className="h-4 w-4" />} onClick={...} />
```

---

## Responsivitet — Container Queries

**ALLA widgets måste använda container queries, INTE viewport media queries.**

```tsx
✅ text-[28px] @min-[300px]:text-[36px] @min-[360px]:text-[48px]
✅ @min-[400px]:grid-cols-2

❌ md:text-[48px]
❌ lg:grid-cols-2
```

Tile har `container-type: size`, så breakpoints mäts mot **widgetens egen bredd**, inte skärmens bredd.

**Standard breakpoint-skala:**
| Breakpoint | Widget-bredd | Font-storlek |
|------------|-------------|--------------|
| Bas | < 240px | 24-28px |
| `@min-[240px]` | 240px+ | 32-36px |
| `@min-[300px]` | 300px+ | 42-48px |
| `@min-[360px]` | 360px+ | 56-62px |
| `@min-[400px]` | 400px+ | 64-72px |
| `@min-[500px]` | 500px+ | 82-96px |

---

## Layout-regler

### Desktop
- Fönster är absolute-positionerade
- Masonry-layout: 1-3 kolumner beroende på skärmbredd
- Fönster kan dras och storleksändras
- Widget-kortet (Tile) är det ENDA synliga — inget yttre hölje

### Mobil
- Widgets staplas vertikalt
- Endast Tile-kortet syns — inga titelrader
- Stäng-knapp: liten `×` uppe till höger
- 2-3 widgets synliga samtidigt (kompakta höjder)

---

## Vanliga mönster

### Toggle-knapp (utan global CSS-bugg)
```tsx
<button
  className="relative !min-h-0 !min-w-0 h-6 w-10 rounded-full transition-colors"
>
  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
    active ? "left-0.5 translate-x-4" : "left-0.5"
  }`} />
</button>
```
**VIKTIGT:** Alltid `!min-h-0 !min-w-0` på små knappar pga global CSS-regel `min-height: 44px` på mobil.

### Progress-bar
```tsx
<div className="h-[3px] w-full rounded-full bg-[var(--border)]">
  <div className="h-full rounded-full bg-[var(--danger)]" style={{ width: `${percent}%` }} />
</div>
```

### Segment-grid (t.ex. batteri)
```tsx
<div className="flex gap-1">
  {Array.from({ length: 20 }).map((_, i) => (
    <div
      key={i}
      className={`h-2 w-2 rounded-sm ${
        i < activeCount ? "bg-[var(--danger)]" : "bg-[var(--border)]"
      }`}
    />
  ))}
</div>
```

---

## Widget-kod-format

Varje widget som visas i playground ska ha en kod-label:
```tsx
<WidgetCard code="CLOCK-001">
  <WidgetRegistry type="ClockCard" />
</WidgetCard>
```

Format: `XXXXX-000` (5 bokstäver, bindestreck, 3 siffror)

---

## Bygg & test

Innan du commitar:
```bash
npm run lint    # ESLint — ska vara tom
npm run build   # Vite build — ska lyckas
```

---

## AI-specifika instruktioner

**När du ska bygga en widget:**
1. Läs ALLTID `src/design/primitives/Tile.tsx` och `src/design/primitives/Label.tsx` först
2. Läs en befintlig widget som liknar den du ska bygga (t.ex. `ClockCard.tsx` för klockor)
3. Använd `useWidgetTheme()` för light/dark-stöd
4. Använd container queries — aldrig `md:`, `lg:`
5. Testa med `npm run lint && npm run build`

**När du ska ändra layout:**
1. Läs `src/components/Desktop.tsx` för masonry-logiken
2. Läs `src/components/Window.tsx` för fönster-beteende
3. Ändra MINIMALT — layout påverkar både desktop och mobil

**När du ska lägga till en ny widget:**
1. Skapa komponenten i `src/design/widgets/`
2. Registrera i `src/components/WidgetRegistry.tsx`
3. Lägg till demo i `src/pages/NothingPlaygroundPage.tsx`
4. Kör bygg och lint
