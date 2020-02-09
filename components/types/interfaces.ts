export interface MVPProps {
  name: string;
  level: number;
  lastKilled: Date;
  field: string;
  size: string;
  race: string;
  respawnRate: number;
  element: string;
  variableRespawn?: number;
  watched?: boolean;
  setWatchList?: (prevState: (mvps: string[]) => string[]) => void;
  whoKilled?: string;
}
