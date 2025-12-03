import { useEffect, useState, useCallback } from "react";
import { useApi } from "./use-api";

export interface WeatherLog {
  _id: string;
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  createdAt: string;
}

export interface WeatherInsights {
  summary: string;
  current_temp: number;
  average_history: string;
  alert_level: "low" | "medium" | "high";
  last_update: string;
}

export function useWeather() {
  const { fetchApi } = useApi();
  const [logs, setLogs] = useState<WeatherLog[]>([]);
  const [insights, setInsights] = useState<WeatherInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    try {
      setError(null);
      
      // Buscar logs
      const logsData = await fetchApi('/api/weather/logs');
      setLogs(Array.isArray(logsData) ? logsData : []);

      // Buscar insights
      const insightsData = await fetchApi('/api/weather/insights', { skipAuth: true });
      setInsights(insightsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados climáticos';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchApi]);

  useEffect(() => {
    fetchWeatherData();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchWeatherData, 30000);
    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  const exportCsv = useCallback(async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/weather/export/csv`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (!response.ok) throw new Error('Erro ao exportar CSV');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'weather_data.csv';
      a.click();
    } catch (err) {
      console.error('CSV export error:', err);
      throw err;
    }
  }, []);

  return { logs, insights, loading, error, fetchWeatherData, exportCsv };
}
