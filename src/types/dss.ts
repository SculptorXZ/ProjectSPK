export interface Location {
  id: string;
  name: string;
  potentialCustomers: number; // percentage
  rentCost: number; // million/month
  accessibility: number; // 1-10
  competitors: number; // 1-10 scale
  security: number; // 1-10
}

export interface Criteria {
  potentialCustomers: number;
  rentCost: number;
  accessibility: number;
  competitors: number;
  security: number;
}

export interface NormalizedLocation extends Location {
  normalized: {
    potentialCustomers: number;
    rentCost: number;
    accessibility: number;
    competitors: number;
    security: number;
  };
  weightedScore: number;
  rank?: number;
}
