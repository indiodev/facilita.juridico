export interface Location{
  id: number;
  x: number;
  y: number;
  created_at: string;
  updated_at: string;
}

export interface LocationPoint{
  x: number;
  y: number;
  identifier?: string;
  visited?: boolean;
}