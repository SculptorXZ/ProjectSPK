import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CriteriaWeightForm } from "@/components/CriteriaWeightForm";
import { LocationForm } from "@/components/LocationForm";
import { Button } from "@/components/ui/button";
import { Location, Criteria } from "@/types/dss";
import { Calculator, Coffee, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const DataEntry = () => {
  const navigate = useNavigate();
  const [weights, setWeights] = useState<Criteria>({
    potentialCustomers: 0.25,
    rentCost: 0.2,
    accessibility: 0.2,
    competitors: 0.15,
    security: 0.2,
  });

  const [locations, setLocations] = useState<Location[]>([]);

  const handleCalculate = () => {
    if (locations.length === 0) {
      toast.error("Tambahkan minimal satu lokasi untuk dihitung");
      return;
    }

    // Validate that all locations have names
    const invalidLocations = locations.filter(loc => !loc.name.trim());
    if (invalidLocations.length > 0) {
      toast.error("Semua lokasi harus memiliki nama");
      return;
    }

    // Check if total weight is approximately 1
    const totalWeight = Object.values(weights).reduce((sum, val) => sum + val, 0);
    if (Math.abs(totalWeight - 1) > 0.01) {
      toast.warning(`Total bobot adalah ${totalWeight.toFixed(2)}. Disarankan total = 1.0`);
    }

    // Navigate to results with data
    navigate("/results", { 
      state: { 
        locations, 
        weights 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-elegant sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="mr-2 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <Coffee className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Input Data Lokasi</h1>
              <p className="text-sm opacity-90">
                Masukkan bobot kriteria dan data alternatif lokasi
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Info Card */}
        <aside className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-coffee-medium text-sm">
            <strong>Petunjuk:</strong> Masukkan bobot untuk setiap kriteria (total disarankan = 1.0), 
            kemudian tambahkan alternatif lokasi yang ingin dibandingkan. 
            Sistem akan menghitung dan merangking lokasi terbaik menggunakan metode Weight Point.
          </p>
        </aside>

        {/* Criteria Weights */}
        <section aria-label="Form Bobot Kriteria">
          <CriteriaWeightForm weights={weights} onChange={setWeights} />
        </section>

        {/* Locations */}
        <section aria-label="Form Alternatif Lokasi">
          <LocationForm locations={locations} onChange={setLocations} />
        </section>

        {/* Calculate Button */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="lg"
            className="px-8 py-6"
          >
            Batal
          </Button>
          <Button
            onClick={handleCalculate}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-elegant"
            aria-label="Hitung Ranking Lokasi"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Hitung Ranking Lokasi
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-coffee-dark text-cream py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Coffee Shop Location DSS | Powered by Kelompok 4
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DataEntry;
