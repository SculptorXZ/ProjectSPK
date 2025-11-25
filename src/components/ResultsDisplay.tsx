import { Card } from "@/components/ui/card";
import { NormalizedLocation } from "@/types/dss";
import { Trophy, TrendingUp, Award } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ResultsDisplayProps {
  results: NormalizedLocation[];
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  if (results.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Ranking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.slice(0, 3).map((result, index) => {
          const icons = [Trophy, Award, TrendingUp];
          const Icon = icons[index];
          const colors = [
            "text-yellow-600 bg-yellow-50 border-yellow-200",
            "text-gray-600 bg-gray-50 border-gray-200",
            "text-orange-600 bg-orange-50 border-orange-200",
          ];

          return (
            <Card
              key={result.id}
              className={`p-6 shadow-elegant border-2 ${colors[index]} transition-all hover:scale-105`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-8 h-8" />
                <div>
                  <p className="text-sm font-medium opacity-70">Peringkat #{result.rank}</p>
                  <h3 className="text-lg font-bold">{result.name || `Lokasi ${index + 1}`}</h3>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Skor Total:</span>
                  <span className="font-bold">{result.weightedScore.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Pelanggan:</span>
                  <span className="font-semibold">{result.potentialCustomers}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Sewa:</span>
                  <span className="font-semibold">Rp {result.rentCost}jt</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed Table */}
      <Card className="p-6 shadow-elegant bg-gradient-warm border-border/50">
        <h3 className="text-xl font-bold text-coffee-dark mb-4">Detail Perhitungan</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-bold">Rank</TableHead>
                <TableHead className="font-bold">Lokasi</TableHead>
                <TableHead className="text-right font-bold">Pelanggan (%)</TableHead>
                <TableHead className="text-right font-bold">Sewa (jt)</TableHead>
                <TableHead className="text-right font-bold">Akses</TableHead>
                <TableHead className="text-right font-bold">Skala Komp.</TableHead>
                <TableHead className="text-right font-bold">Keamanan</TableHead>
                <TableHead className="text-right font-bold">Skor Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id} className="hover:bg-secondary/30">
                  <TableCell className="font-semibold">#{result.rank}</TableCell>
                  <TableCell className="font-medium">{result.name || "-"}</TableCell>
                  <TableCell className="text-right">{result.potentialCustomers}</TableCell>
                  <TableCell className="text-right">{result.rentCost}</TableCell>
                  <TableCell className="text-right">{result.accessibility}</TableCell>
                  <TableCell className="text-right">{result.competitors}</TableCell>
                  <TableCell className="text-right">{result.security}</TableCell>
                  <TableCell className="text-right font-bold text-accent">
                    {result.weightedScore.toFixed(4)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Normalized Values Table */}
      <Card className="p-6 shadow-elegant bg-gradient-warm border-border/50">
        <h3 className="text-xl font-bold text-coffee-dark mb-4">Nilai Normalisasi</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-bold">Lokasi</TableHead>
                <TableHead className="text-right font-bold">Pelanggan</TableHead>
                <TableHead className="text-right font-bold">Sewa</TableHead>
                <TableHead className="text-right font-bold">Akses</TableHead>
                <TableHead className="text-right font-bold">Kompetitor</TableHead>
                <TableHead className="text-right font-bold">Keamanan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id} className="hover:bg-secondary/30">
                  <TableCell className="font-medium">{result.name || "-"}</TableCell>
                  <TableCell className="text-right">
                    {result.normalized.potentialCustomers.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    {result.normalized.rentCost.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    {result.normalized.accessibility.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    {result.normalized.competitors.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    {result.normalized.security.toFixed(4)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
