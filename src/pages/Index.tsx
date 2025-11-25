import { useState } from "react";
import { CriteriaWeightForm } from "@/components/CriteriaWeightForm";
import { LocationForm } from "@/components/LocationForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { AIAnalysis } from "@/components/AIAnalysis";
import { Button } from "@/components/ui/button";
import { Location, Criteria, NormalizedLocation } from "@/types/dss";
import { calculateWP } from "@/utils/wpCalculation";
import { Calculator, Coffee } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-coffee-dss.jpg";

const Index = () => {
  const [weights, setWeights] = useState<Criteria>({
    potentialCustomers: 0.25,
    rentCost: 0.2,
    accessibility: 0.2,
    competitors: 0.15,
    security: 0.2,
  });

  const [locations, setLocations] = useState<Location[]>([]);
  const [results, setResults] = useState<NormalizedLocation[]>([]);

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

    const calculated = calculateWP(locations, weights);
    setResults(calculated);
    toast.success("Perhitungan berhasil!");
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-elegant sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Coffee className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Coffee Shop Location DSS</h1>
              <p className="text-sm opacity-90">
                Sistem Pendukung Keputusan - Metode Weight Point
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-64 md:h-80 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/90 to-coffee-dark/50" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl text-cream">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Temukan Lokasi Coffee Shop Terbaik
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                Gunakan analisis berbasis AI dan metode Weight Point untuk keputusan yang objektif dan terukur
              </p>
            </div>
          </div>
        </div>
      </section>

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
        <div className="flex justify-center">
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

        {/* Results */}
        {results.length > 0 && (
          <section id="results" className="space-y-8 pt-8" aria-label="Hasil Perhitungan">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-coffee-dark mb-2">Hasil Perhitungan</h2>
              <p className="text-coffee-medium">
                Berikut adalah ranking lokasi terbaik berdasarkan metode Weight Point
              </p>
            </div>
            
            <ResultsDisplay results={results} />
            <AIAnalysis results={results} weights={weights} />
          </section>
        )}
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

export default Index;
