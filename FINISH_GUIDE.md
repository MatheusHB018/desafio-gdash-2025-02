# 🚀 GUIA RÁPIDO PARA TERMINAR EM 4-6 HORAS

## ⏰ TIMELINE SUGERIDA

```
HH:00 → HH:30  │  Integração Frontend (30 min)
HH:30 → HH:45  │  Teste Local (15 min)
HH:45 → HH:50  │  Ajustes (5 min)
───────────────┼─────────────────
HH:50 → HH:55  │  Preparar vídeo (5 min)
HH:55 → HH:60  │  Gravar vídeo (5-10 min)
HH:60 → HH:70  │  Editar (10 min)
───────────────┼─────────────────
HH:70 → HH:75  │  Upload YouTube (5 min)
HH:75 → HH:80  │  Submeter PR (5 min)
───────────────┼─────────────────
TOTAL: 4-5 HORAS
```

---

## 🎯 TAREFA 1: INTEGRAÇÃO FRONTEND-BACKEND (30 MIN)

### Passo 1: Criar hook para Weather
Criar arquivo: `frontend/src/hooks/use-weather.ts`

```typescript
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useWeather() {
  const [logs, setLogs] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Buscar logs
        const logsRes = await fetch(`${API_URL}/api/weather/logs`, { headers });
        if (logsRes.ok) setLogs(await logsRes.json());

        // Buscar insights
        const insightsRes = await fetch(`${API_URL}/api/weather/insights`, { headers });
        if (insightsRes.ok) setInsights(await insightsRes.json());

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Atualizar a cada 30s

    return () => clearInterval(interval);
  }, []);

  return { logs, insights, loading, error };
}
```

### Passo 2: Integrar no Dashboard
Modificar: `frontend/src/pages/Dashboard.tsx`

```typescript
import { useWeather } from '@/hooks/use-weather';
import { Skeleton } from '@/components/ui/skeleton';

export function Dashboard() {
  const { logs, insights, loading, error } = useWeather();

  if (loading) return <Skeleton className="w-full h-screen" />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Passar dados reais aos componentes */}
      <WeatherCharts data={logs} />
      <KPICard data={logs[0]} />
      <AIInsights data={insights} />
      <HistoryTable data={logs} />
    </div>
  );
}
```

### Passo 3: Atualizar URL da API
Criar/modificar: `frontend/.env.local`

```env
VITE_API_URL=http://localhost:3000
```

### Passo 4: Atualizar Mock Data
Comentar: `frontend/src/data/mockData.ts` ou deixar como fallback

```typescript
// Usar dados reais quando disponíveis
// Mock fica como fallback
```

---

## 🧪 TAREFA 2: TESTAR LOCALMENTE (15 MIN)

### Terminal 1: Docker Compose
```bash
cd weather-challenge
docker-compose up -d

# Esperar 30 segundos para inicializar todos os serviços
docker-compose ps
```

### Terminal 2: Verificar Logs
```bash
# Verificar se Python está coletando
docker-compose logs weather-collector -f

# Verificar se Go está processando
docker-compose logs weather-worker -f

# Verificar se Backend está rodando
docker-compose logs backend -f
```

### No Navegador
1. Abrir: http://localhost:5173
2. Login: `admin@example.com` / `123456`
3. Verificar:
   - ✅ Dashboard carrega dados reais
   - ✅ Gráficos exibem informações
   - ✅ Insights aparecem
   - ✅ Tabela tem registros

### Teste rápido da API
```bash
# Em outro terminal
curl -X GET http://localhost:3000/api/weather/logs

# Deve retornar array com dados climáticos
```

---

## 🎬 TAREFA 3: GRAVAR VÍDEO (5-10 MIN)

### Preparação (2 min)
1. Preparar roteiro:
   - "Olá, vou apresentar o desafio GDASH"
   - "Arquitetura: Python coleta → RabbitMQ → Go processa → NestJS API → MongoDB"
   - "Frontend em React exibe os dados em tempo real"
   - Mostrar cada componente rapidamente

2. Limpar tela: F11 para fullscreen no navegador
3. Aumentar zoom se necessário (Ctrl + +)

### Gravação (5-10 min)
Use OBS Studio (gratuito) ou ScreenFlow (Mac)

**Script (máximo 5 minutos):**

```
[00:00-00:30] Introdução
"Oi! Eu sou [seu nome]. Este é meu projeto para o desafio GDASH.
A aplicação é um sistema de coleta e análise de dados climáticos
usando uma arquitetura moderna com múltiplas linguagens."

[00:30-01:30] Explicação Arquitetura
"A arquitetura é assim:
1. Um serviço em Python coleta dados de clima a cada minuto
   via Open-Meteo API
2. Os dados são enviados para uma fila RabbitMQ
3. Um worker em Go consome a fila e envia para a API
4. A API em NestJS processa e armazena em MongoDB
5. O frontend em React exibe os dados em tempo real"

[01:30-02:30] Demonstração
Mostrar:
- Dashboard carregando dados climáticos reais
- Gráficos atualizando
- Insights de IA sendo exibidos
- Tabela com histórico
- Clicar em Export CSV (opcional)

[02:30-03:00] Features Adicionais
"Extras implementados:
- Modo de insights simples E avançado (OpenAI/Gemini)
- Autenticação JWT
- CRUD de usuários
- Integração com PokéAPI
- Exportação CSV/XLSX"

[03:00-03:30] Conclusão
"O sistema todo está rodando em Docker Compose com 6 serviços.
Código em TypeScript, MongoDB para dados, tudo integrado.
Obrigado!"
```

### Upload no YouTube
1. Ir para YouTube.com
2. Fazer upload
3. Título: "Desafio GDASH 2025/02 - [Seu Nome]"
4. **IMPORTANTE: Definir como "Não listado"** (não público, mas qualquer um com link acessa)
5. Copiar URL

---

## 📤 TAREFA 4: SUBMETER PULL REQUEST (15 MIN)

### 1. Commit Final
```bash
git add .
git commit -m "feat: integração completa frontend-backend e documentação

- Conectado Dashboard aos endpoints reais
- Atualizado useWeather hook
- Adicionado vídeo explicativo
- Verificado sistema completo funcionando via Docker Compose"
```

### 2. Push
```bash
git push origin seu-nome-completo
```

### 3. Criar PR no GitHub
1. Ir para o repositório
2. Clicar em "New Pull Request"
3. Selecionar base: `main`, compare: `seu-nome-completo`
4. Criar título: "Desafio GDASH - [Seu Nome]"
5. No body, incluir:

```markdown
## Resumo
Implementação completa do desafio GDASH 2025/02

## O que foi feito
- ✅ Stack obrigatória (React, NestJS, TypeScript, MongoDB, Docker)
- ✅ Pipeline Python → RabbitMQ → Go → NestJS → MongoDB
- ✅ Frontend com Dashboard e Insights de IA
- ✅ CRUD de usuários com autenticação JWT
- ✅ Exportação CSV/XLSX
- ✅ Integração PokéAPI
- ✅ Docker Compose com 6 serviços

## Vídeo Explicativo
🎥 [Link YouTube Não Listado](https://youtu.be/seu-video-id)

## Como Rodar
```bash
docker-compose up -d
# Esperar 30 segundos
# Acessar http://localhost:5173
# Login: admin@example.com / 123456
```

## Endpoints Principais
- `POST /auth/login` - Login
- `GET /api/weather/logs` - Dados climáticos
- `GET /api/weather/insights` - Insights IA
- `GET /api/weather/export/csv` - Download CSV
- `GET /users` - Listar usuários

## Notas
- Arquivo `.env` já configurado
- Usuário admin criado automaticamente
- Python coleta dados a cada 1 minuto
- Go worker processa com retry automático
```

6. Clicar em "Create Pull Request"

---

## ✅ CHECKLIST FINAL

### Antes de Submeter
- [ ] Frontend conectado aos endpoints reais
- [ ] Docker Compose rodando sem erros
- [ ] Python coletando dados
- [ ] Go processando mensagens
- [ ] NestJS API funcionando
- [ ] Frontend exibindo dados reais
- [ ] Login funcionando
- [ ] Exportação CSV testada
- [ ] Vídeo gravado e upado no YouTube (não listado)
- [ ] Link do vídeo no README
- [ ] PR criado com descrição completa

### Arquivos Importantes
- ✅ `docker-compose.yml` - Pronto
- ✅ `.env` - Pronto
- ✅ `README.md` - Atualizado
- ✅ `SUMMARY.md` - Documentação
- ✅ `API_DOCUMENTATION.md` - Endpoints
- ✅ `frontend/src/hooks/use-weather.ts` - NOVO
- ✅ `frontend/src/pages/Dashboard.tsx` - Atualizado
- ✅ Link do Vídeo - NO PR

---

## 🆘 TROUBLESHOOTING

### Docker não sobe
```bash
docker-compose down -v
docker-compose up -d --build
```

### Frontend não conecta na API
Verificar `.env.local`:
```env
VITE_API_URL=http://localhost:3000
```

### Nenhum dado aparecendo
1. Esperar 2-3 minutos para Python coletar primeiro dado
2. Verificar logs: `docker-compose logs weather-collector`
3. Verificar RabbitMQ: http://localhost:15672 (guest/guest)

### Erro ao fazer login
Verificar se MongoDB iniciou:
```bash
docker-compose logs mongo
```

---

## 🎯 RESUMO DOS 4 PASSOS

| Passo | O Quê | Tempo |
|-------|-------|-------|
| 1 | Integrar Frontend-Backend | 30 min |
| 2 | Testar Localmente | 15 min |
| 3 | Gravar Vídeo | 10 min |
| 4 | Submeter PR | 15 min |
| **TOTAL** | **Sistema 100% Pronto** | **~70 min (ou até 2h se editar vídeo)** |

---

## 🚀 VOCÊ CONSEGUE!

Tudo está pronto. Basta:
1. Conectar Dashboard (cópia-cola, ~10 linhas de código)
2. Subir Docker (um comando)
3. Gravar 5 minutos
4. Submeter PR

**Estimativa: 1-2 horas de trabalho ativo.**

Boa sorte! 🎉
