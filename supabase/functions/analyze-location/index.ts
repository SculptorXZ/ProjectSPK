import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { winner, weights, allLocations } = data;

    // Create analysis prompt
    const prompt = `Anda adalah seorang analis bisnis coffee shop yang berpengalaman. Analisis hasil pemilihan lokasi berikut:

LOKASI TERPILIH: ${winner.name}
Skor Total: ${winner.score.toFixed(4)}

DATA LOKASI TERPILIH:
- Pelanggan Potensial: ${winner.potentialCustomers}%
- Biaya Sewa: Rp ${winner.rentCost} juta/bulan
- Aksesibilitas: ${winner.accessibility}/10
- Jumlah Kompetitor: ${winner.competitors}
- Keamanan: ${winner.security}/10

BOBOT KRITERIA YANG DIGUNAKAN:
- Pelanggan Potensial: ${weights.potentialCustomers}
- Biaya Sewa: ${weights.rentCost}
- Aksesibilitas: ${weights.accessibility}
- Kompetitor: ${weights.competitors}
- Keamanan: ${weights.security}

SEMUA LOKASI (Ranking):
${allLocations.map((loc: any) => `${loc.rank}. ${loc.name} - Skor: ${loc.score.toFixed(4)}`).join('\n')}

Berikan analisis yang mencakup:
1. Mengapa lokasi ini menjadi yang terbaik berdasarkan data dan bobot yang diberikan
2. Kekuatan utama lokasi ini
3. Potensi risiko atau kelemahan yang perlu diperhatikan
4. Rekomendasi tindak lanjut untuk pemilik coffee shop
5. Insight tambahan jika ada data yang ekstrem atau menarik

Format jawaban dalam paragraf yang mudah dibaca, bukan poin-poin. Berikan analisis yang mendalam dan actionable.`;

    console.log("Sending request to Lovable AI...");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "Anda adalah analis bisnis coffee shop yang berpengalaman dengan pemahaman mendalam tentang pemilihan lokasi strategis.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const analysis = aiResponse.choices[0].message.content;

    console.log("Analysis generated successfully");

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-location function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
