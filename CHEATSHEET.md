# 📌 CHEAT SHEET - Referência Rápida

## 🎯 Em Uma Linha

**Para começar:** `choco install mongodb-community mongodb-compass -y`
**Para testar:** http://localhost:5173 com admin@example.com / 123456
**Para commitar:** Leia GIT_COMMIT_READY.md

---

## ⚡ Comandos Rápidos

```powershell
# Instalar MongoDB
choco install mongodb-community mongodb-compass -y

# Iniciar MongoDB
Get-Service MongoDB | Start-Service

# Parar MongoDB
Get-Service MongoDB | Stop-Service

# Status MongoDB
Get-Service MongoDB | Select-Object Status

# Backend
cd weather-challenge/backend && npm run start:dev

# Python
cd weather-challenge/weather-collector && python main.py

# Go Worker
cd weather-challenge/weather-worker && go run main.go

# Git
git add . && git commit -m "feat: Complete" && git push
```

---

## 🔗 Portas

| Serviço | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 3000 | http://localhost:3000 |
| MongoDB | 27017 | mongodb://localhost:27017 |
| RabbitMQ | 5672 | amqp://localhost:5672 |

---

## 🔐 Credenciais

```
Email:    admin@example.com
Senha:    123456
```

---

## 📂 Pastas Importantes

```
backend/          npm run start:dev
frontend/         npm run dev (já rodando)
weather-collector/  python main.py
weather-worker/   go run main.go
```

---

## 🐛 Erros Comuns

| Erro | Solução |
|------|---------|
| Connection refused | `Get-Service MongoDB \| Start-Service` |
| Port already in use | Mudar port no .env |
| No data | Verificar se Python/Go estão rodando |
| Frontend vazio | Verificar console (F12) para erros |

---

## 📊 Arquivos Principais

```
.env                     Database config
.env.local              API URL
src/                    Frontend components
src/hooks/              useApi, useWeather
src/contexts/           AuthContext
API_DOCUMENTATION.md    Endpoints
GIT_COMMIT_READY.md     Commit pronto
```

---

## ✅ Checklist Rápido

- [ ] MongoDB instalado
- [ ] 4 terminais com serviços
- [ ] http://localhost:5173 acessível
- [ ] Login funciona
- [ ] Dashboard com dados
- [ ] MongoDB Compass mostra docs
- [ ] Vídeo gravado
- [ ] Commit feito

---

## 🚀 Timeline

```
5 min   - Instalar MongoDB
5 min   - Iniciar serviços
5 min   - Testar
10 min  - Gravar vídeo
5 min   - Commit
---
30 min  - PRONTO ✅
```

---

## 📞 Arquivos por Necessidade

**"Quero começar"** → QUICK_START.md
**"Tenho erro"** → TROUBLESHOOTING.md
**"Quero detalhe"** → ARCHITECTURE.md
**"Vou commitar"** → GIT_COMMIT_READY.md
**"Preciso API"** → API_DOCUMENTATION.md

---

## 🔍 Verificar Status

```powershell
# MongoDB rodando?
Get-Service MongoDB | Select-Object Status

# Port 3000 ativo?
netstat -ano | findstr ":3000"

# Port 5173 ativo?
netstat -ano | findstr ":5173"

# Todos serviços?
Get-Service | Where-Object { $_.Name -like "*mongo*" }
```

---

*Última atualização: 5 de Dezembro de 2025*
