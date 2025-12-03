# 🚀 COMO RODAR O SISTEMA COMPLETO

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Docker e Docker Compose instalados
- MongoDB rodando (via Docker Compose)
- RabbitMQ rodando (via Docker Compose)

## 🚀 PASSO 1: SUBIR A INFRAESTRUTURA

### Terminal 1: Docker Compose

```bash
cd weather-challenge
docker-compose up -d

# Aguarde 30 segundos para inicialização
# Verificar status
docker-compose ps
```

**Serviços que serão iniciados:**
- ✅ MongoDB (porta 27017)
- ✅ RabbitMQ (porta 5672, UI em 15672)
- ✅ Python Collector
- ✅ Go Worker
- ✅ NestJS Backend (porta 3000)
- ✅ React Frontend (porta 5173)

---

## 🚀 PASSO 2: INICIAR O BACKEND (Se não está rodando via Docker)

### Terminal 2: Backend

```bash
cd weather-challenge/backend

# Instalar dependências (primeira vez)
npm install

# Iniciar servidor
npm run start:dev

# Esperado:
# [Nest] ... Starting Nest application...
# [Nest] ... Listening on port 3000
```

---

## 🚀 PASSO 3: INICIAR O FRONTEND

### Terminal 3: Frontend

```bash
cd weather-challenge/frontend

# Instalar dependências (primeira vez)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Esperado:
#   VITE v5.4.19  ready in 500 ms
#   ➜  Local:   http://localhost:5173/
```

---

## 🌐 ACESSAR O APLICATIVO

1. Abrir navegador em: **http://localhost:5173**

2. Fazer login com credenciais padrão:
   - **Email:** `admin@example.com`
   - **Senha:** `123456`

3. Você será redirecionado para o **Dashboard**

---

## 🔍 VERIFICAR TUDO ESTÁ FUNCIONANDO

### Verificar Backend

```bash
# Em outro terminal
curl http://localhost:3000/api/weather/logs

# Deve retornar um JSON com os dados climáticos
```

### Verificar RabbitMQ

1. Abrir navegador: **http://localhost:15672**
2. Login: `guest` / `guest`
3. Verificar se há mensagens em `weather_queue`

### Verificar MongoDB

```bash
# Se tiver mongosh instalado
mongosh mongodb://localhost:27017

# Listar bancos
show dbs

# Usar banco weather_db
use weather_db

# Ver coleções
show collections

# Ver dados
db.weatherlogs.find()
```

### Verificar Python Collector

```bash
# Ver logs
docker-compose logs weather-collector -f

# Esperado:
# 🌤️ Buscando dados climáticos...
# 📤 Enviado: XX.X°C
```

### Verificar Go Worker

```bash
# Ver logs
docker-compose logs weather-worker -f

# Esperado:
# ✅ Worker Go conectado
# 📥 Recebido da Fila: {...}
# 💾 Sucesso: Dados salvos no Backend
```

---

## 📊 O QUE VER NO DASHBOARD

1. **Header:** Mostra localização e última atualização
2. **KPI Cards:** Temperatura, Umidade, Velocidade do Vento, Condição
3. **AI Insights:** Análise automática do clima com alertas
4. **Gráficos:** Histórico de temperatura e umidade
5. **Tabela:** Últimos 20 registros com dados completos
6. **Botão Export:** Para baixar dados em CSV

---

## 🛑 PARAR O SISTEMA

```bash
# Parar Docker Compose
docker-compose down

# Parar apenas containers (mantém volumes)
docker-compose stop

# Parar e remover tudo
docker-compose down -v
```

---

## 🔐 ENDPOINTS DISPONÍVEIS

### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login e obtenção de JWT

### Clima
- `GET /api/weather/logs` - Listar dados climáticos
- `POST /api/weather/logs` - Adicionar novo registro
- `GET /api/weather/insights` - Obter insights de IA
- `GET /api/weather/export/csv` - Exportar CSV

### Usuários
- `GET /users` - Listar usuários
- `GET /users/:id` - Obter usuário
- `PATCH /users/:id` - Editar usuário
- `DELETE /users/:id` - Deletar usuário

### Explorer (Opcional)
- `GET /api/explorer/pokemon` - Listar Pokémons
- `GET /api/explorer/pokemon/:name` - Detalhe de Pokémon

---

## 📈 ESPERADO DE FUNCIONAMENTO

1. **Primeira vez:** Aguarde 2-3 minutos para o Python coletar dados
2. **Dashboard:** Mostrará dados reais coletados automaticamente
3. **Atualização:** A cada 1 minuto (configurável)
4. **Insights:** Gerados automaticamente com base nos dados
5. **Exportação:** Clique em "Export CSV" para baixar dados

---

## 🐛 TROUBLESHOOTING

### "Connection refused" ao conectar na API

```bash
# Verificar se backend está rodando
curl http://localhost:3000/api/weather/logs

# Se não responder, iniciar backend manualmente
cd backend
npm run start:dev
```

### "Cannot connect to MongoDB"

```bash
# Verificar se MongoDB está rodando
docker-compose logs mongo

# Reiniciar MongoDB
docker-compose restart mongo
```

### "Frontend não carrega dados"

1. Abrir DevTools (F12)
2. Ir para Console
3. Verificar se há erros de CORS
4. Verificar se `VITE_API_URL=http://localhost:3000` está em `.env.local`

### "Login não funciona"

1. Verificar credenciais: `admin@example.com` / `123456`
2. Verificar se backend está rodando
3. Abrir DevTools → Network e ver requisição POST /auth/login

---

## 📝 ARQUIVOS IMPORTANTES

```
weather-challenge/
├── docker-compose.yml        ← Orquestração de serviços
├── .env                       ← Variáveis de ambiente
├── backend/
│   ├── src/auth/             ← Autenticação JWT
│   ├── src/users/            ← CRUD de usuários
│   ├── src/weather/          ← Endpoints climáticos
│   └── .env                  ← Vars do backend
├── frontend/
│   ├── src/pages/Dashboard.tsx    ← Página principal
│   ├── src/contexts/AuthContext.tsx ← Gerenciamento de auth
│   ├── src/hooks/use-weather.ts   ← Hook para dados
│   └── .env                       ← Vars do frontend
├── weather-collector/
│   └── main.py               ← Coleta dados de clima
└── weather-worker/
    └── main.go               ← Processa fila RabbitMQ
```

---

## ✅ CHECKLIST DE FUNCIONAMENTO

- [ ] Docker Compose subiu sem erros
- [ ] MongoDB iniciou com sucesso
- [ ] RabbitMQ iniciou com sucesso
- [ ] Python está coletando dados
- [ ] Go Worker está processando
- [ ] Backend respondendo em http://localhost:3000
- [ ] Frontend respondendo em http://localhost:5173
- [ ] Login funcionou com admin@example.com / 123456
- [ ] Dashboard mostra dados reais
- [ ] AI Insights aparecem
- [ ] Gráficos mostram histórico
- [ ] Tabela exibe registros
- [ ] Export CSV funciona

---

**Pronto! Sistema completo rodando! 🎉**
