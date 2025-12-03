import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";

interface WeatherInsights {
  summary: string;
  current_temp: number;
  average_history: string;
  alert_level: "low" | "medium" | "high";
  last_update: string;
}

const alertColors: Record<string, string> = {
  high: "bg-destructive/20 text-destructive border-destructive/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  low: "bg-success/20 text-success border-success/30",
};

export function AIInsights({ insights }: { insights?: WeatherInsights }) {
  if (!insights) {
    return null;
  }

  const alertLabel = {
    high: "High Alert",
    medium: "Medium Alert",
    low: "Normal",
  };

  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "200ms" }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="flex items-center gap-2">
              AI Weather Insights
              <Sparkles className="h-4 w-4 text-accent" />
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className={alertColors[insights.alert_level] || ""}
          >
            {alertLabel[insights.alert_level]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Summary */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-sm leading-relaxed text-foreground">
            {insights.summary}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Current Temp
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {insights.current_temp}°C
            </p>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Avg Temp
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {insights.average_history}°C
            </p>
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>Analysis Complete</span>
          </div>
          <span>{new Date(insights.last_update).toLocaleTimeString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
