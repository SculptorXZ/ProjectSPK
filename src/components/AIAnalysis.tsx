import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NormalizedLocation, Criteria } from "@/types/dss";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AIAnalysisProps {
  results: NormalizedLocation[];
  weights: Criteria;
}

export const AIAnalysis = ({ results, weights }: AIAnalysisProps) => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generateAnalysis = async () => {
    if (results.length === 0) {
      toast.error("Tidak ada data untuk dianalisis");
      return;
    }

    setLoading(true);
    setAnalysis("");

    try {
      // Prepare data for AI analysis
      const topLocation = results[0];
      const dataContext = {
        winner: {
          name: topLocation.name,
          score: topLocation.weightedScore,
          potentialCustomers: topLocation.potentialCustomers,
          rentCost: topLocation.rentCost,
          accessibility: topLocation.accessibility,
          competitors: topLocation.competitors,
          security: topLocation.security,
        },
        weights,
        allLocations: results.map(r => ({
          name: r.name,
          score: r.weightedScore,
          rank: r.rank,
        })),
      };

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-location`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: dataContext }),
        }
      );

      if (response.status === 429) {
        toast.error("Rate limit tercapai. Silakan coba lagi nanti.");
        return;
      }

      if (response.status === 402) {
        toast.error("Kredit habis. Silakan tambahkan kredit di workspace Anda.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const { analysis: aiAnalysis } = await response.json();
      setAnalysis(aiAnalysis);
      toast.success("Analisis berhasil dibuat!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Gagal menghasilkan analisis AI");
    } finally {
      setLoading(false);
    }
  };

  if (results.length === 0) return null;

  return (
    <Card className="p-6 shadow-elegant bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-accent" />
          <h3 className="text-xl font-bold text-coffee-dark">Analisis AI</h3>
        </div>
        <Button
          onClick={generateAnalysis}
          disabled={loading}
          className="bg-accent hover:bg-accent/90"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Menganalisis...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Analisis
            </>
          )}
        </Button>
      </div>

      {analysis ? (
        <div className="prose prose-sm max-w-none">
          <div className="bg-card p-4 rounded-lg whitespace-pre-wrap text-coffee-medium">
            {analysis}
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-8">
          Klik tombol "Generate Analisis" untuk mendapatkan insight dari AI
        </p>
      )}
    </Card>
  );
};
