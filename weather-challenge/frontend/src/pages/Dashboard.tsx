import { KPICard } from "@/components/dashboard/KPICard";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { TemperatureChart, RainProbabilityChart } from "@/components/dashboard/WeatherCharts";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { Thermometer, Droplets, Wind, Cloud, MapPin, AlertCircle } from "lucide-react";
import { useWeather } from "@/hooks/use-weather";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { logs, insights, loading, error, exportCsv } = useWeather();

  const currentWeather = logs && logs.length > 0 ? logs[0] : null;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Weather Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Real-time weather monitoring and AI-powered insights
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{currentWeather?.city || "Loading..."}</span>
              {currentWeather && (
                <>
                  <span className="text-border">•</span>
                  <span>
                    Last updated: {new Date(currentWeather.createdAt).toLocaleTimeString()}
                  </span>
                </>
              )}
            </div>
            <Button onClick={exportCsv} variant="outline" size="sm">
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      {currentWeather ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Temperature"
            value={currentWeather.temperature}
            unit="°C"
            icon={Thermometer}
            color="primary"
            delay={0}
          />
          <KPICard
            title="Humidity"
            value={currentWeather.humidity}
            unit="%"
            icon={Droplets}
            color="success"
            delay={50}
          />
          <KPICard
            title="Wind Speed"
            value={currentWeather.windSpeed}
            unit="km/h"
            icon={Wind}
            color="warning"
            delay={100}
          />
          <KPICard
            title="Condition"
            value={currentWeather.condition}
            icon={Cloud}
            color="accent"
            delay={150}
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      )}

      {/* AI Insights */}
      {insights && <AIInsights insights={insights} />}

      {/* Charts */}
      {logs && logs.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <TemperatureChart data={logs} />
          <RainProbabilityChart data={logs} />
        </div>
      )}

      {/* History Table */}
      {logs && logs.length > 0 && <HistoryTable data={logs} />}
    </div>
  );
}
