import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Location } from "@/types/dss";
import { Plus, Trash2, MapPin } from "lucide-react";
import { nanoid } from "nanoid";

interface LocationFormProps {
  locations: Location[];
  onChange: (locations: Location[]) => void;
}

export const LocationForm = ({ locations, onChange }: LocationFormProps) => {
  const addLocation = () => {
    const newLocation: Location = {
      id: nanoid(),
      name: "",
      potentialCustomers: 0,
      rentCost: 0,
      accessibility: 5,
      competitors: 5,
      security: 5,
    };
    onChange([...locations, newLocation]);
  };

  const removeLocation = (id: string) => {
    onChange(locations.filter((loc) => loc.id !== id));
  };

  const updateLocation = (id: string, field: keyof Location, value: string | number) => {
    onChange(
      locations.map((loc) =>
        loc.id === id ? { ...loc, [field]: value } : loc
      )
    );
  };

  return (
    <Card className="p-6 shadow-elegant bg-gradient-warm border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-coffee-dark">Alternatif Lokasi</h2>
        </div>
        <Button onClick={addLocation} className="bg-accent hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Lokasi
        </Button>
      </div>

      <div className="space-y-6">
        {locations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Belum ada lokasi. Klik "Tambah Lokasi" untuk memulai.</p>
          </div>
        ) : (
          locations.map((location, index) => (
            <Card key={location.id} className="p-4 bg-card border-border/50 shadow-soft">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-coffee-medium">
                  Lokasi {index + 1}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLocation(location.id)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${location.id}`}>Nama Lokasi</Label>
                  <Input
                    id={`name-${location.id}`}
                    type="text"
                    value={location.name}
                    onChange={(e) => updateLocation(location.id, "name", e.target.value)}
                    placeholder="Contoh: Jl. Sudirman No. 123"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`customers-${location.id}`}>
                    Pelanggan Potensial (%)
                  </Label>
                  <Input
                    id={`customers-${location.id}`}
                    type="number"
                    min="0"
                    max="100"
                    value={location.potentialCustomers}
                    onChange={(e) =>
                      updateLocation(location.id, "potentialCustomers", parseFloat(e.target.value) || 0)
                    }
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`rent-${location.id}`}>
                    Biaya Sewa (juta/bulan)
                  </Label>
                  <Input
                    id={`rent-${location.id}`}
                    type="number"
                    min="0"
                    step="0.5"
                    value={location.rentCost}
                    onChange={(e) =>
                      updateLocation(location.id, "rentCost", parseFloat(e.target.value) || 0)
                    }
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`access-${location.id}`}>
                    Aksesibilitas (1-10)
                  </Label>
                  <Input
                    id={`access-${location.id}`}
                    type="number"
                    min="1"
                    max="10"
                    value={location.accessibility}
                    onChange={(e) =>
                      updateLocation(location.id, "accessibility", parseInt(e.target.value) || 1)
                    }
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`competitors-${location.id}`}>
                    Skala Kompetitor (1-10)
                  </Label>
                  <Input
                    id={`competitors-${location.id}`}
                    type="number"
                    min="1"
                    max="10"
                    value={location.competitors}
                    onChange={(e) =>
                      updateLocation(location.id, "competitors", parseInt(e.target.value) || 1)
                    }
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`security-${location.id}`}>
                    Keamanan (1-10)
                  </Label>
                  <Input
                    id={`security-${location.id}`}
                    type="number"
                    min="1"
                    max="10"
                    value={location.security}
                    onChange={(e) =>
                      updateLocation(location.id, "security", parseInt(e.target.value) || 1)
                    }
                    className="bg-background border-border"
                  />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Card>
  );
};
