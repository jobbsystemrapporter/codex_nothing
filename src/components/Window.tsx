import { useRef, useCallback, useState, useEffect } from "react";
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
    onFocus();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, winX: instance.x, winY: instance.y };
  }, [instance.x, instance.y, onFocus]);

  const handleResizeDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setResizing(true);
    resizeStart.current = { x: e.clientX, y: e.clientY, w: instance.w, h: instance.h };
  }, [instance.w, instance.h]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(".win-resize")) return;
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

  // Mobile card mode
  if (isMobile) {
    return (
      <div
        className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-2)] ring-1 ring-[var(--border)] shadow-[0_8px_24px_rgba(0,0,0,0.24)]"
        style={{ zIndex }}
        onClick={onFocus}
      >
        <div className="flex items-center justify-between px-4 py-3 select-none">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
            {instance.type.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-3)] hover:text-[var(--text)]"
            >
              −
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--danger)] hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto px-4 pb-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-2)] ring-1 ring-[var(--border)] shadow-[0_18px_36px_rgba(0,0,0,0.38)]"
      style={{
        left: instance.x,
        top: instance.y,
        width: instance.w,
        height: instance.h,
        zIndex,
        cursor: dragging ? "grabbing" : "default",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="flex items-center justify-between px-4 py-3 select-none">
        <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {instance.type.replace(/([A-Z])/g, " $1").trim()}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-3)] hover:text-[var(--text)]"
          >
            −
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--danger)] hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-4 pb-4 min-h-0">
        {children}
      </div>
      <div className="win-resize absolute bottom-0 right-0 h-4 w-4 cursor-se-resize" onMouseDown={handleResizeDown} onTouchStart={handleResizeTouchStart} />
    </div>
  );
}
