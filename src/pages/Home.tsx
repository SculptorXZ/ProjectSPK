import { Button } from "@/components/ui/button";
import { Coffee, Calculator, BarChart3, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-coffee-dss.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-elegant">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Coffee className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Lokasi Coffee Shop</h1>
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
          className="h-96 md:h-[500px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/90 to-coffee-dark/50" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-3xl text-cream">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Temukan Lokasi Coffee Shop Terbaik
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Gunakan analisis berbasis AI dan metode Weight Point untuk keputusan yang objektif dan terukur
              </p>
              <Button 
                onClick={() => navigate("/data-entry")}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-lg px-8 py-6 shadow-elegant"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Mulai Analisis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-coffee-dark mb-12">
          Fitur Unggulan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-lg shadow-elegant border border-border/50">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-coffee-dark mb-4">Metode Weight Point</h3>
            <p className="text-coffee-medium">
              Perhitungan matematis yang objektif untuk membandingkan berbagai alternatif lokasi berdasarkan kriteria terukur.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-elegant border border-border/50">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-coffee-dark mb-4">Analisis AI</h3>
            <p className="text-coffee-medium">
              Dapatkan insight tambahan dari AI yang menjelaskan mengapa lokasi tertentu menjadi pilihan terbaik.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-elegant border border-border/50">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-coffee-dark mb-4">Visualisasi Data</h3>
            <p className="text-coffee-medium">
              Lihat hasil perhitungan dalam bentuk ranking, tabel detail, dan data normalisasi yang mudah dipahami.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-accent/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-coffee-dark mb-12">
            Cara Kerja
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-coffee-dark mb-2">Masukkan Bobot & Lokasi</h3>
                <p className="text-coffee-medium">
                  Tentukan bobot untuk setiap kriteria (pelanggan potensial, biaya sewa, aksesibilitas, kompetitor, keamanan) dan masukkan data alternatif lokasi yang ingin dibandingkan.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-coffee-dark mb-2">Hitung dengan Metode WP</h3>
                <p className="text-coffee-medium">
                  Sistem akan melakukan normalisasi data dan menghitung skor weighted untuk setiap lokasi menggunakan metode Weight Point.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-coffee-dark mb-2">Dapatkan Hasil & Analisis AI</h3>
                <p className="text-coffee-medium">
                  Lihat ranking lokasi terbaik, tabel perhitungan detail, dan analisis AI yang menjelaskan rekomendasi serta insight tambahan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-6">
          Siap Menemukan Lokasi Terbaik?
        </h2>
        <p className="text-xl text-coffee-medium mb-8 max-w-2xl mx-auto">
          Mulai analisis sekarang dan buat keputusan bisnis yang lebih baik dengan data yang terukur.
        </p>
        <Button 
          onClick={() => navigate("/data-entry")}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-elegant"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Mulai Sekarang
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-coffee-dark text-cream py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Coffee Shop Location DSS | Powered by Kelompok 4
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
