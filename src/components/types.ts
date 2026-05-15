export type WidgetInstance = {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
};

export type WidgetProps = {
  light?: boolean;
  [key: string]: unknown;
};
