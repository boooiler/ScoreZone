export interface Player {
    id: number;
    name: string;
    number: number;
    pos: string;
}
  
export interface TeamData {
    team: {
      name: string;
      logo: string;
    };
    formation: string;
    startXI: Player[];
    substitutes: Player[];
}