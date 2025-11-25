import { Location, Criteria, NormalizedLocation } from "@/types/dss";

export const calculateWP = (
  locations: Location[],
  weights: Criteria
): NormalizedLocation[] => {
  if (locations.length === 0) return [];

  // Find max and min values for normalization
  const maxValues = {
    potentialCustomers: Math.max(...locations.map(l => l.potentialCustomers)),
    accessibility: Math.max(...locations.map(l => l.accessibility)),
    competitors: Math.max(...locations.map(l => l.competitors)),
    security: Math.max(...locations.map(l => l.security)),
  };

  const minValues = {
    rentCost: Math.min(...locations.map(l => l.rentCost)),
  };

  // Normalize and calculate weighted scores
  const normalized: NormalizedLocation[] = locations.map(location => {
    // Benefit criteria (higher is better): divide by max
    const normPotentialCustomers = maxValues.potentialCustomers > 0 
      ? location.potentialCustomers / maxValues.potentialCustomers 
      : 0;
    const normAccessibility = maxValues.accessibility > 0 
      ? location.accessibility / maxValues.accessibility 
      : 0;
    const normSecurity = maxValues.security > 0 
      ? location.security / maxValues.security 
      : 0;

    // Cost criteria (lower is better): min divide by value
    const normRentCost = location.rentCost > 0 
      ? minValues.rentCost / location.rentCost 
      : 0;
    
    // Competitors is now 1-10 scale (higher = better competitive position)
    const normCompetitors = maxValues.competitors > 0 
      ? location.competitors / maxValues.competitors 
      : 0;

    const normalized = {
      potentialCustomers: normPotentialCustomers,
      rentCost: normRentCost,
      accessibility: normAccessibility,
      competitors: normCompetitors,
      security: normSecurity,
    };

    // Calculate weighted score
    const weightedScore =
      normalized.potentialCustomers * weights.potentialCustomers +
      normalized.rentCost * weights.rentCost +
      normalized.accessibility * weights.accessibility +
      normalized.competitors * weights.competitors +
      normalized.security * weights.security;

    return {
      ...location,
      normalized,
      weightedScore,
    };
  });

  // Sort by weighted score and assign ranks
  const sorted = normalized.sort((a, b) => b.weightedScore - a.weightedScore);
  return sorted.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
};
