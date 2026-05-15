import { useRef, useCallback, useState, useEffect } from "react";
import type { WidgetInstance } from "./types";

type WindowProps = {
  instance: WidgetInstance;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onUpdate: (updates: Partial<WidgetInstance>) => void;
  children: React.ReactNode;
};

export function Window({ instance, zIndex, onClose, onMinimize, onFocus, onUpdate, children }: WindowProps) {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

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

  useEffect(() => {
    if (!dragging && !resizing) return;
    const handleMove = (e: MouseEvent) => {
      if (dragging) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        onUpdate({ x: Math.max(0, dragStart.current.winX + dx), y: Math.max(0, dragStart.current.winY + dy) });
      }
      if (resizing) {
        const dw = e.clientX - resizeStart.current.x;
        const dh = e.clientY - resizeStart.current.y;
        onUpdate({ w: Math.max(200, resizeStart.current.w + dw), h: Math.max(150, resizeStart.current.h + dh) });
      }
    };
    const handleUp = () => {
      setDragging(false);
      setResizing(false);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, resizing, onUpdate]);

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
      <div className="win-resize absolute bottom-0 right-0 h-4 w-4 cursor-se-resize" onMouseDown={handleResizeDown} />
    </div>
  );
}
