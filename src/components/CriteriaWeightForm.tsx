import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Criteria } from "@/types/dss";
import { Coffee } from "lucide-react";

interface CriteriaWeightFormProps {
  weights: Criteria;
  onChange: (weights: Criteria) => void;
}

export const CriteriaWeightForm = ({ weights, onChange }: CriteriaWeightFormProps) => {
  const handleChange = (field: keyof Criteria, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({
      ...weights,
      [field]: numValue,
    });
  };

  const totalWeight = Object.values(weights).reduce((sum, val) => sum + val, 0);

  return (
    <Card className="p-6 shadow-elegant bg-gradient-warm border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <Coffee className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-coffee-dark">Bobot Kriteria</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="potentialCustomers" className="text-coffee-medium font-semibold">
            Pelanggan Potensial
          </Label>
          <Input
            id="potentialCustomers"
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={weights.potentialCustomers}
            onChange={(e) => handleChange("potentialCustomers", e.target.value)}
            className="bg-card border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rentCost" className="text-coffee-medium font-semibold">
            Biaya Sewa
          </Label>
          <Input
            id="rentCost"
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={weights.rentCost}
            onChange={(e) => handleChange("rentCost", e.target.value)}
            className="bg-card border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessibility" className="text-coffee-medium font-semibold">
            Aksesibilitas
          </Label>
          <Input
            id="accessibility"
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={weights.accessibility}
            onChange={(e) => handleChange("accessibility", e.target.value)}
            className="bg-card border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="competitors" className="text-coffee-medium font-semibold">
            Skala Kompetitor
          </Label>
          <Input
            id="competitors"
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={weights.competitors}
            onChange={(e) => handleChange("competitors", e.target.value)}
            className="bg-card border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="security" className="text-coffee-medium font-semibold">
            Keamanan
          </Label>
          <Input
            id="security"
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={weights.security}
            onChange={(e) => handleChange("security", e.target.value)}
            className="bg-card border-border"
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border/50">
        <p className="text-sm text-coffee-medium">
          <span className="font-semibold">Total Bobot:</span> {totalWeight.toFixed(2)}
          {totalWeight !== 1 && (
            <span className="ml-2 text-destructive text-xs">
              (Disarankan total = 1.0)
            </span>
          )}
        </p>
      </div>
    </Card>
  );
};
