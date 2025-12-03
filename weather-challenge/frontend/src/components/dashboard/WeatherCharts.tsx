import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, CloudRain } from "lucide-react";

interface WeatherLog {
  _id: string;
  temperature: number;
  humidity: number;
  createdAt: string;
  condition: string;
}

interface WeatherChartsProps {
  data: WeatherLog[];
}

export function TemperatureChart({ data }: WeatherChartsProps) {
  const chartData = data
    .slice()
    .reverse()
    .map((log, idx) => ({
      hour: new Date(log.createdAt).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: log.temperature,
      humidity: log.humidity,
    }));

  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "300ms" }}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
            <TrendingUp className="h-5 w-5 text-chart-1" />
          </div>
          <CardTitle>Temperature Trend</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={Math.max(0, Math.floor(chartData.length / 6))}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                domain={["dataMin - 2", "dataMax + 2"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--chart-1))" }}
                formatter={(value: number) => [`${value}°C`, "Temperature"]}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--chart-1))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function RainProbabilityChart({ data }: WeatherChartsProps) {
  const chartData = data
    .slice()
    .reverse()
    .map((log) => ({
      time: new Date(log.createdAt).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      humidity: log.humidity,
    }));

  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "400ms" }}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
            <CloudRain className="h-5 w-5 text-chart-4" />
          </div>
          <CardTitle>Humidity Levels</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={Math.max(0, Math.floor(chartData.length / 6))}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--chart-4))" }}
                formatter={(value: number) => [`${value}%`, "Humidity"]}
              />
              <Bar
                dataKey="humidity"
                fill="hsl(var(--chart-4))"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
