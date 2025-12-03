import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileSpreadsheet, History } from "lucide-react";
import { toast } from "sonner";

interface WeatherLog {
  _id: string;
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  createdAt: string;
}

interface HistoryTableProps {
  data: WeatherLog[];
}

const conditionColors: Record<string, string> = {
  "Céu Limpo": "bg-warning/20 text-warning border-warning/30",
  "Parcialmente Nublado": "bg-muted text-muted-foreground border-border",
  Nublado: "bg-secondary text-secondary-foreground border-border",
  "Chuva Leve": "bg-chart-4/20 text-chart-4 border-chart-4/30",
  Chuva: "bg-primary/20 text-primary border-primary/30",
  Encoberto: "bg-muted text-muted-foreground border-border",
  Desconhecido: "bg-secondary text-secondary-foreground border-border",
};

export function HistoryTable({ data }: HistoryTableProps) {
  const exportCSV = () => {
    const headers = ["Data/Hora", "Cidade", "Temperatura", "Umidade", "Vento", "Condição"];
    const rows = data.map((row) => [
      new Date(row.createdAt).toLocaleString("pt-BR"),
      row.city,
      `${row.temperature}°C`,
      `${row.humidity}%`,
      `${row.windSpeed}km/h`,
      row.condition,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weather_history.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado com sucesso!");
  };

  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "500ms" }}>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <History className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle>Histórico de Clima</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium">Data/Hora</TableHead>
                <TableHead className="font-medium">Cidade</TableHead>
                <TableHead className="font-medium">Condição</TableHead>
                <TableHead className="font-medium text-right">Temp</TableHead>
                <TableHead className="font-medium text-right">Umidade</TableHead>
                <TableHead className="font-medium text-right">Vento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 20).map((row) => (
                <TableRow key={row._id} className="hover:bg-secondary/50">
                  <TableCell className="font-mono text-sm">
                    {new Date(row.createdAt).toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={conditionColors[row.condition] || ""}
                    >
                      {row.condition}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.temperature}°C
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.humidity}%
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.windSpeed}km/h
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {data.length > 20 && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Mostrando 20 de {data.length} registros
          </p>
        )}
      </CardContent>
    </Card>
  );
}
