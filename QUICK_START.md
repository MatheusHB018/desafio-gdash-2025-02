# ⚡ QUICK START - MongoDB Compass + Sistema Completo

## 🚀 Passo 1: Instalar MongoDB (1 minuto)

Abra PowerShell como Administrador:

```powershell
choco install mongodb-community mongodb-compass -y
```

**Se não tem Chocolatey:** Instale em https://www.mongodb.com/try/download/community

---

## ✅ Passo 2: Iniciar MongoDB (30 segundos)

```powershell
Get-Service MongoDB | Start-Service
```

Verificar status:
```powershell
Get-Service MongoDB | Select-Object Status
```

Esperado: `Running` ✅

---

## 🖥️ Passo 3: Abrir MongoDB Compass (1 minuto)

1. Procure **"MongoDB Compass"** no menu Iniciar
2. Abra o app
3. Clique **"Connect"** (já vem com localhost:27017)
4. Pronto! Verá seus bancos de dados

---

## 🔧 Passo 4: Iniciar Backend (1 minuto)

Abra **PowerShell NOVO** e execute:

```powershell
cd "c:\Users\mathe\OneDrive\Área de Trabalho\desafio-gdash-2025-02\weather-challenge\backend"
npm run start:dev
```

Esperado:
```
[Nest] XXXX - 03/12/2025, XX:XX:XX LOG [NestFactory] Nest application successfully started
Listening on port 3000
```

---

## 🐍 Passo 5: Iniciar Python Collector (1 minuto)

Abra **PowerShell NOVO** e execute:

```powershell
cd "c:\Users\mathe\OneDrive\Área de Trabalho\desafio-gdash-2025-02\weather-challenge\weather-collector"
python main.py
```

Esperado: `Collecting weather data...` ✅

---

## 🔄 Passo 6: Iniciar Go Worker (1 minuto)

Abra **PowerShell NOVO** e execute:

```powershell
cd "c:\Users\mathe\OneDrive\Área de Trabalho\desafio-gdash-2025-02\weather-challenge\weather-worker"
go run main.go
```

Esperado: `Waiting for messages...` ✅

---

## 🌐 Passo 7: Acessar Frontend

Abra seu navegador:
```
http://localhost:5173
```

**Login:**
- Email: `admin@example.com`
- Senha: `123456`

---

## 📊 Passo 8: Ver Dados no Compass

1. Abra **MongoDB Compass**
2. Vá para: `weather_db` → `weather_logs`
3. Veja dados chegando em tempo real! 🎉

---

## 📋 Resumo - 4 Terminais Abertos

| # | O quê | Comando |
|---|-------|---------|
| 1 | MongoDB | `Get-Service MongoDB \| Start-Service` |
| 2 | Backend | `cd backend` `npm run start:dev` |
| 3 | Python Collector | `cd weather-collector` `python main.py` |
| 4 | Go Worker | `cd weather-worker` `go run main.go` |

Deixe todos rodando! 🚀

---

## 4️⃣ VERIFICAR DASHBOARD

- [ ] Página carrega
- [ ] Login funciona
- [ ] Dashboard mostra dados (espere 30s)
- [ ] Cards de KPI aparecem
- [ ] Gráficos renderizam
- [ ] Tabela com histórico aparece

---

## 5️⃣ FAZER COMMIT (5 min)

```powershell
cd "c:\Users\mathe\OneDrive\Área de Trabalho\desafio-gdash-2025-02"

git add .

git commit -m "Feat: Complete Frontend-Backend integration with real data flow

- Implemented useApi() hook for authenticated HTTP requests
- Implemented useWeather() hook for real-time weather data
- Upgraded AuthContext from mock to real JWT authentication
- Refactored all dashboard components to consume API data
- Added proper error handling and loading states
- Configured environment variables for API connectivity
- Frontend successfully running on http://localhost:5173
- Backend ready for MongoDB connection on localhost:27017"

git push origin main
```

---

## 📊 RESUMO RÁPIDO

| Passo | Tempo | Status |
|-------|-------|--------|
| 1. Instalar MongoDB | 15min | ⏳ TODO |
| 2. npm run start:dev | 2min | ⏳ TODO |
| 3. Verificar Frontend | 1min | ✅ PRONTO |
| 4. Testar Dashboard | 3min | ⏳ TODO |
| 5. Git Commit | 5min | ⏳ TODO |
| **TOTAL** | **~20min** | ⏳ |

---

## ✨ TUDO PRONTO!

✅ Frontend rodando em http://localhost:5173  
✅ Backend compilado e pronto em `npm run start:dev`  
✅ Todas as dependências instaladas  
✅ Configurações validadas  
✅ Código sem erros  

**Basta:**
1. Instalar MongoDB
2. Executar Backend
3. Fazer commit

**Sucesso! 🚀**

---

## 🆘 Problemas?

### MongoDB não conecta?
- Verifique se está rodando: `mongosh`
- Inicie manualmente: `mongod --dbpath "C:\data\db"`

### Backend não inicia?
- Verifique se npm install completou
- Delete `node_modules` e refaça: `npm install`

### Frontend não carrega?
- Já está rodando em http://localhost:5173
- Se fechou, execute: `npm run dev` na pasta frontend

### Login não funciona?
- Credenciais: admin@example.com / 123456
- Verifique se Backend está rodando em http://localhost:3000

---

**Vamos lá! Você está muito perto do final! 💪**
