import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherLog, WeatherLogDocument } from './schemas/weather-log.schema';
import { Parser } from 'json2csv';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherLog.name) private weatherModel: Model<WeatherLogDocument>,
    private configService: ConfigService,
  ) {}

  async create(data: any): Promise<WeatherLog> {
    const createdLog = new this.weatherModel(data);
    return createdLog.save();
  }

  async findAll(): Promise<WeatherLog[]> {
    return this.weatherModel.find().sort({ createdAt: -1 }).limit(100).exec();
  }

  // --- Lógica de "IA" (Insights) com suporte OpenAI/Gemini ---
  async generateInsights() {
    const logs = await this.weatherModel.find().sort({ createdAt: -1 }).limit(12).exec();
    
    if (!logs || logs.length === 0) {
      return { 
        summary: "Ainda não há dados suficientes para gerar insights.", 
        alert_level: "low" 
      };
    }

    const current = logs[0];
    const avgTemp = logs.reduce((acc, curr) => acc + curr.temperature, 0) / logs.length;
    let message = this.generateSimpleInsight(current, avgTemp);

    // Se houver chave de API, usar IA avançada
    const hasOpenAI = !!this.configService.get<string>('OPENAI_API_KEY');
    const hasGemini = !!this.configService.get<string>('GEMINI_API_KEY');

    if (hasOpenAI) {
      try {
        message = await this.generateOpenAIInsight(current, avgTemp);
      } catch (error) {
        console.error('Erro ao usar OpenAI, caindo para simples:', error);
      }
    } else if (hasGemini) {
      try {
        message = await this.generateGeminiInsight(current, avgTemp);
      } catch (error) {
        console.error('Erro ao usar Gemini, caindo para simples:', error);
      }
    }

    const alert = this.determineAlertLevel(current, avgTemp);

    return {
      summary: message,
      current_temp: current.temperature,
      average_history: avgTemp.toFixed(1),
      alert_level: alert,
      last_update: current.createdAt
    };
  }

  // Insight simples baseado em regras
  private generateSimpleInsight(current: any, avgTemp: number): string {
    if (current.temperature > 30) {
      return "🔥 Alerta de Calor: Temperaturas elevadas detectadas. Hidrate-se e evite exposição prolongada ao sol.";
    } else if (current.condition && current.condition.toLowerCase().includes("chuva")) {
      return "🌧️ Previsão de Chuva: Guarda-chuva recomendado. Tenha cuidado nas pistas molhadas.";
    } else if (current.temperature < 10) {
      return "❄️ Frio Intenso: Temperaturas baixas. Mantenha-se aquecido e vista roupas apropriadas.";
    } else if (current.temperature < avgTemp - 5) {
      return "📉 Queda de Temperatura: Queda brusca detectada nas últimas horas.";
    } else if (current.temperature > avgTemp + 5) {
      return "📈 Aumento de Temperatura: Clima mais quente que o normal.";
    } else {
      return "✅ Condições Estáveis: Clima normal e agradável. Aproveite o dia!";
    }
  }

  // Determinar nível de alerta
  private determineAlertLevel(current: any, avgTemp: number): string {
    if (current.temperature > 35 || current.temperature < 0) {
      return "high";
    } else if (current.temperature > 30 || current.temperature < 10) {
      return "medium";
    }
    return "low";
  }

  // Insight usando OpenAI (AVANÇADO)
  private async generateOpenAIInsight(current: any, avgTemp: number): Promise<string> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) return this.generateSimpleInsight(current, avgTemp);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Baseado nos dados meteorológicos abaixo, gere um insight breve e prático em português (máximo 2 linhas):
              - Temperatura atual: ${current.temperature}°C
              - Condição: ${current.condition || 'Não especificada'}
              - Temperatura média (últimas 12 coletas): ${avgTemp.toFixed(1)}°C
              
              Retorne apenas o insight, sem explicações.`,
            },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.generateSimpleInsight(current, avgTemp);
    }
  }

  // Insight usando Gemini (AVANÇADO)
  private async generateGeminiInsight(current: any, avgTemp: number): Promise<string> {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) return this.generateSimpleInsight(current, avgTemp);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Baseado nos dados meteorológicos abaixo, gere um insight breve e prático em português (máximo 2 linhas):
                  - Temperatura atual: ${current.temperature}°C
                  - Condição: ${current.condition || 'Não especificada'}
                  - Temperatura média (últimas 12 coletas): ${avgTemp.toFixed(1)}°C
                  
                  Retorne apenas o insight, sem explicações.`,
                },
              ],
            },
          ],
        },
        {
          params: {
            key: apiKey,
          },
        }
      );

      return response.data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.generateSimpleInsight(current, avgTemp);
    }
  }

  // --- Exportação CSV ---
  async getCsvData() {
    const logs = await this.findAll();
    const fields = ['city', 'temperature', 'humidity', 'windSpeed', 'condition', 'createdAt'];
    const parser = new Parser({ fields });
    return parser.parse(logs);
  }
}