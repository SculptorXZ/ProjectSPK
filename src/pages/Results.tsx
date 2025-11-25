import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { AIAnalysis } from "@/components/AIAnalysis";
import { Button } from "@/components/ui/button";
import { Location, Criteria, NormalizedLocation } from "@/types/dss";
import { calculateWP } from "@/utils/wpCalculation";
import { Coffee, ArrowLeft, RotateCcw } from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<NormalizedLocation[]>([]);
  const [weights, setWeights] = useState<Criteria | null>(null);

  useEffect(() => {
    const state = location.state as { locations: Location[]; weights: Criteria } | null;
    
    if (!state || !state.locations || !state.weights) {
      navigate("/data-entry");
      return;
    }

    const calculated = calculateWP(state.locations, state.weights);
    setResults(calculated);
    setWeights(state.weights);
  }, [location.state, navigate]);

  if (!weights || results.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-elegant sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/data-entry")}
              className="mr-2 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <Coffee className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Hasil Analisis</h1>
              <p className="text-sm opacity-90">
                Ranking lokasi berdasarkan metode Weight Point
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-coffee-dark mb-2">Hasil Perhitungan</h2>
          <p className="text-coffee-medium">
            Berikut adalah ranking lokasi terbaik berdasarkan metode Weight Point
          </p>
        </div>
        
        <ResultsDisplay results={results} />
        <AIAnalysis results={results} weights={weights} />

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-8">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="lg"
            className="px-8 py-6"
          >
            Ke Beranda
          </Button>
          <Button
            onClick={() => navigate("/data-entry")}
            size="lg"
            className="bg-accent hover:bg-accent/90 px-8 py-6"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Analisis Baru
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

export default Results;
