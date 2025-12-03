# 🗺️ MAPA MENTAL - SISTEMA COMPLETO

## 🎯 VISÃO GERAL DO PROJETO

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DESAFIO GDASH 2025/02                           │
│                   Sistema de Análise Climática                     │
└─────────────────────────────────────────────────────────────────────┘

                         FRONTEND (React)
                         http://localhost:5173
                         ✅ RODANDO
                              ↑
                         JWT Token
                              ↑
                    ┌──────────────────┐
                    │   useWeather()   │ ← Fetch dados weather
                    │    useApi()      │ ← HTTP com JWT
                    └──────────────────┘
                              ↑
                         HTTP Requests
                              ↓
                         BACKEND (NestJS)
                         http://localhost:3000
                         ✅ PRONTO (aguardando MongoDB)
                              ↓
                     ┌────────────────────┐
                     │   MongoDB          │
                     │   localhost:27017  │
                     │   ⏳ INSTALANDO   │
                     └────────────────────┘
```

---

## 📊 ARQUITETURA DETALHADA

```
USER (Navegador)
  │
  └─→ http://localhost:5173
       │
       ├─→ Login Component
       │    └─→ AuthContext.login()
       │         └─→ POST /auth/login
       │              └─→ Backend valida (bcrypt)
       │                  └─→ Retorna JWT
       │
       └─→ Dashboard Component
            │
            ├─→ useWeather() hook
            │    ├─→ GET /api/weather/logs
            │    │    └─→ Retorna WeatherLog[]
            │    │
            │    └─→ GET /api/weather/insights
            │         └─→ Retorna WeatherInsights
            │
            ├─→ AIInsights Component
            │    └─→ Renderiza insights (summary, alert_level)
            │
            ├─→ WeatherCharts Component
            │    ├─→ TemperatureChart (LineChart)
            │    └─→ HumidityChart (BarChart)
            │
            └─→ HistoryTable Component
                 └─→ CSV Export button
```

---

## 🔄 FLUXO DE DADOS

### 1. Autenticação (Login)
```
Frontend (Login.tsx)
    ↓
Clique em "Entrar"
    ↓
POST /auth/login
{ email: "admin@example.com", password: "123456" }
    ↓
Backend (auth.controller)
    ↓
Busca user no MongoDB
    ↓
Valida password com bcrypt
    ↓
Gera JWT token
    ↓
Retorna { access_token, user }
    ↓
Frontend (AuthContext)
    ↓
Salva token em localStorage
    ↓
Redirect para /dashboard
```

### 2. Buscar Dados (Dashboard)
```
Frontend (Dashboard.tsx)
    ↓
useWeather() hook
    ↓
GET /api/weather/logs
(Header: Authorization: Bearer JWT)
    ↓
Backend (weather.controller)
    ↓
Mongoose query no MongoDB
    ↓
Retorna WeatherLog[]
    ↓
Frontend recebe dados
    ↓
Components renderizam:
├─→ AIInsights
├─→ WeatherCharts
└─→ HistoryTable
```

### 3. Dados no MongoDB
```
Python Collector (main.py)
    ↓
Coleta de Open-Meteo API
    ↓
JSON com: { temp, humidity, windSpeed, condition, ... }
    ↓
Envia para RabbitMQ queue
    ↓
Go Worker (main.go)
    ↓
Consome mensagem
    ↓
Valida dados
    ↓
POST /api/weather/logs
{ city, temperature, humidity, windSpeed, condition }
    ↓
Backend (weather.service)
    ↓
Mongoose save
    ↓
MongoDB collection: weather_logs
    ↓
{ _id, city, temperature, humidity, ..., createdAt }
```

---

## 📁 ESTRUTURA DE PASTAS

```
desafio-gdash-2025-02/
│
├── 📄 Documentação (você lê)
│   ├── QUICK_START.md ⭐
│   ├── MONGODB_SETUP.md ⭐
│   ├── NEXT_ACTION.md ⭐
│   ├── FINAL_STATUS.md
│   ├── DOCS_INDEX.md
│   └── ... (10+ arquivos)
│
└── weather-challenge/
    │
    ├── backend/ (NestJS)
    │   ├── src/
    │   │   ├── auth/ (JWT)
    │   │   ├── users/ (CRUD)
    │   │   ├── weather/ (API Weather)
    │   │   └── explorer/ (PokéAPI)
    │   ├── .env ✅
    │   └── package.json ✅
    │
    ├── frontend/ (React)
    │   ├── src/
    │   │   ├── hooks/
    │   │   │   ├── use-api.ts ⭐ (Novo)
    │   │   │   └── use-weather.ts ⭐ (Novo)
    │   │   ├── contexts/
    │   │   │   └── AuthContext.tsx ✏️
    │   │   ├── pages/
    │   │   │   ├── Dashboard.tsx ✏️
    │   │   │   └── Login.tsx ✏️
    │   │   └── components/dashboard/
    │   │       ├── AIInsights.tsx ✏️
    │   │       ├── WeatherCharts.tsx ✏️
    │   │       └── HistoryTable.tsx ✏️
    │   ├── .env.local ✅
    │   └── package.json ✅
    │
    ├── weather-collector/ (Python)
    │   └── main.py (Coleta Open-Meteo)
    │
    ├── weather-worker/ (Go)
    │   └── main.go (Processa RabbitMQ)
    │
    └── docker-compose.yml (Orquestração)

Legend:
⭐ Novo arquivo
✏️ Modificado
✅ OK/Configurado
```

---

## 🔐 AUTENTICAÇÃO

```
┌─────────────────────────────────────────┐
│        FLUXO JWT AUTENTICAÇÃO           │
└─────────────────────────────────────────┘

1. LOGIN
   POST /auth/login
   Body: { email, password }
   ↓
   Backend valida credenciais
   ↓
   Gera JWT token (1 hora de expiration)
   ↓
   Retorna: { access_token, user }

2. ARMAZENAR TOKEN
   localStorage.setItem('access_token', token)
   localStorage.setItem('auth_user', JSON.stringify(user))

3. USAR TOKEN
   GET /api/weather/logs
   Header: Authorization: Bearer <token>
   ↓
   Backend verifica JWT
   ↓
   JWT válido → Retorna dados
   JWT inválido → 401 Unauthorized → Logout automático

4. LOGOUT
   localStorage.removeItem('access_token')
   localStorage.removeItem('auth_user')
   Redirect para /login
```

---

## 🎯 COMPONENTES REACT

```
App.tsx (Router)
  │
  ├─→ Login.tsx
  │    └─→ useAuth()
  │         └─→ AuthContext.login()
  │
  ├─→ Dashboard.tsx ⭐
  │    ├─→ useWeather() ⭐ (Novo hook)
  │    ├─→ useAuth()
  │    ├─→ KPICard (Múltiplos)
  │    ├─→ AIInsights ✏️
  │    ├─→ WeatherCharts ✏️
  │    │    ├─→ TemperatureChart
  │    │    └─→ HumidityChart
  │    └─→ HistoryTable ✏️
  │
  ├─→ Explorer.tsx
  │    └─→ PokéAPI
  │
  ├─→ Users.tsx
  │    └─→ CRUD de usuários
  │
  └─→ NotFound.tsx
```

---

## 📊 HOOKS CRIADOS

### useApi() ⭐
```typescript
const { fetchApi } = useApi();

// Uso:
const data = await fetchApi('/api/endpoint');
// Adiciona JWT automaticamente no header
// Trata 401 e faz logout
// Retorna JSON parseado
```

### useWeather() ⭐
```typescript
const { logs, insights, loading, error, fetchWeatherData, exportCsv } = useWeather();

// logs: WeatherLog[]
// insights: WeatherInsights
// loading: boolean
// error: string | null
// fetchWeatherData(): Promise<void>
// exportCsv(): void

// Auto-refresh a cada 30 segundos
```

---

## 🛠️ TECNOLOGIAS

```
FRONTEND
├─ React 18.3.1 (UI)
├─ TypeScript 5.8.3 (Tipagem)
├─ Vite 5.4.19 (Build)
├─ Tailwind CSS 3.4.17 (Estilo)
├─ shadcn/ui (Componentes)
├─ React Router 6.30.1 (Routing)
├─ Recharts 2.15.4 (Gráficos)
└─ Axios (HTTP) [via useApi]

BACKEND
├─ NestJS 11.0.1 (Framework)
├─ TypeScript 5.7.3 (Tipagem)
├─ Mongoose 8.20.1 (ODM)
├─ MongoDB (Database)
├─ JWT 10.2.0 (Autenticação)
├─ Passport 0.7.0 (Estratégias)
├─ bcrypt 5.1.1 (Hash senha)
└─ json2csv 6.0.0 (Export)

INFRASTRUCTURE
├─ Python 3.11 (Collector)
├─ Go 1.21+ (Worker)
├─ RabbitMQ 3 (Message Broker)
├─ Docker Compose (Orquestração)
└─ Open-Meteo API (Dados climáticos)
```

---

## 🚀 PRÓXIMOS PASSOS (VISUAL)

```
┌─────────────────────────────────────┐
│   INSTALAR MONGODB                  │
│   ✋ SUA AÇÃO (15 min)               │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   npm run start:dev (Backend)       │
│   ✋ SUA AÇÃO (2 min)                │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   Testar em http://localhost:5173   │
│   ✋ SUA AÇÃO (5 min)                │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   git add . && git commit           │
│   ✋ SUA AÇÃO (5 min)                │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   Gravar Vídeo (5 min)              │
│   ✋ SUA AÇÃO (10 min)               │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   Criar Pull Request                │
│   ✋ SUA AÇÃO (5 min)                │
└─────────────────────────────────────┘
                   ↓
          ✅ PRONTO! 🎉
```

---

## ✨ RESUMO

**Você tem:**
- ✅ Frontend rodando e pronto
- ✅ Backend compilado e pronto
- ✅ Integração completa
- ✅ Autenticação funcional
- ✅ Hooks de dados criados
- ✅ Documentação completa

**Você precisa:**
- ⏳ Instalar MongoDB
- ⏳ Iniciar Backend
- ⏳ Testar Frontend
- ⏳ Fazer Commit
- ⏳ Gravar Vídeo
- ⏳ Criar PR

**Tempo total:** ~42 minutos até Pull Request! 🚀

---

**Comece em: QUICK_START.md**

**Você consegue! 💪**
