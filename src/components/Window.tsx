import { useRef, useCallback, useState, useEffect } from "react";
import { useWidgetSettings } from "../hooks/useWidgetSettings";
import type { WidgetInstance } from "./types";

type WindowProps = {
  instance: WidgetInstance;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onUpdate: (updates: Partial<WidgetInstance>) => void;
  isMobile?: boolean;
  children: React.ReactNode;
};

export function Window({ instance, zIndex, onClose, onMinimize, onFocus, onUpdate, isMobile, children }: WindowProps) {
  const { settings } = useWidgetSettings();
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const clampToViewport = useCallback((x: number, y: number, w: number, h: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: Math.max(0, Math.min(x, vw - Math.min(w, vw))),
      y: Math.max(0, Math.min(y, vh - Math.min(h, vh))),
      w: Math.max(200, Math.min(w, vw)),
      h: Math.max(150, Math.min(h, vh)),
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".win-resize")) return;
    if ((e.target as HTMLElement).closest("button, input, textarea, select, a, [role='button'], label")) return;
    onFocus();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, winX: instance.x, winY: instance.y };
  }, [instance.x, instance.y, onFocus]);

  const handleResizeDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setResizing(true);
    resizeStart.current = { x: e.clientX, y: e.clientY, w: instance.w, h: instance.h };
  }, [instance.w, instance.h]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(".win-resize")) return;
    if ((e.target as HTMLElement).closest("button, input, textarea, select, a, [role='button'], label")) return;
    const touch = e.touches[0];
    onFocus();
    setDragging(true);
    dragStart.current = { x: touch.clientX, y: touch.clientY, winX: instance.x, winY: instance.y };
  }, [instance.x, instance.y, onFocus]);

  const handleResizeTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    setResizing(true);
    resizeStart.current = { x: touch.clientX, y: touch.clientY, w: instance.w, h: instance.h };
  }, [instance.w, instance.h]);

  useEffect(() => {
    if (!dragging && !resizing) return;

    const handleMove = (clientX: number, clientY: number) => {
      if (dragging) {
        const dx = clientX - dragStart.current.x;
        const dy = clientY - dragStart.current.y;
        const next = clampToViewport(
          dragStart.current.winX + dx,
          dragStart.current.winY + dy,
          instance.w,
          instance.h
        );
        onUpdate({ x: next.x, y: next.y });
      }
      if (resizing) {
        const dw = clientX - resizeStart.current.x;
        const dh = clientY - resizeStart.current.y;
        const next = clampToViewport(instance.x, instance.y, resizeStart.current.w + dw, resizeStart.current.h + dh);
        onUpdate({ w: next.w, h: next.h });
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onEnd = () => {
      setDragging(false);
      setResizing(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [dragging, resizing, instance.x, instance.y, instance.w, instance.h, onUpdate, clampToViewport]);

  // Mobile: just the widget card — no title bar, no outer shell
  if (isMobile) {
    return (
      <div
        className="relative"
        style={{ zIndex, minHeight: instance.h, "--widget-opacity": settings.opacity } as React.CSSProperties}
        data-widget-opacity=""
        data-widget-border={String(settings.showBorder)}
        data-widget-shadow={String(settings.showShadow)}
        data-widget-glass={String(settings.glassEffect)}
        onClick={onFocus}
      >
        {/* Floating close button — small, semi-transparent, sits in corner */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface-2)]/60 text-[10px] text-[var(--text-muted)] ring-1 ring-[var(--border)] backdrop-blur-sm transition-colors active:bg-[var(--danger)] active:text-white"
        >
          ×
        </button>
        {children}
      </div>
    );
  }

  return (
    <div
      className="absolute"
      style={{
        left: instance.x,
        top: instance.y,
        width: instance.w,
        height: instance.h,
        zIndex,
        cursor: dragging ? "grabbing" : "default",
        "--widget-opacity": settings.opacity,
      } as React.CSSProperties}
      data-widget-opacity=""
      data-widget-border={String(settings.showBorder)}
      data-widget-shadow={String(settings.showShadow)}
      data-widget-glass={String(settings.glassEffect)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Floating controls — no outer shell, just buttons over the widget */}
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-2)]/70 text-[11px] text-[var(--text-muted)] ring-1 ring-[var(--border)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-3)] hover:text-[var(--text)]"
        >
          −
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-2)]/70 text-[11px] text-[var(--text-muted)] ring-1 ring-[var(--border)] backdrop-blur-sm transition-colors hover:bg-[var(--danger)] hover:text-white"
        >
          ×
        </button>
      </div>

      {/* Widget fills entire allocated area */}
      <div className="h-full w-full">
        {children}
      </div>

      {/* Subtle resize handle */}
      <div className="win-resize absolute bottom-1 right-1 flex h-4 w-4 cursor-se-resize items-end justify-end" onMouseDown={handleResizeDown} onTouchStart={handleResizeTouchStart}>
        <svg width="10" height="10" viewBox="0 0 10 10" className="pointer-events-none text-[var(--text-muted)] opacity-30">
          <path d="M6 10L10 10L10 6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 10L10 10L10 2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  );
}
