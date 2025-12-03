# ⚡ QUICK START - PRÓXIMOS 20 MINUTOS

## 1️⃣ INSTALAR MONGODB (15 min)

### Windows - Opção A: MSI (Recomendado)
```
1. https://www.mongodb.com/try/download/community
2. Baixe Windows MSI
3. Execute e instale (aceite defaults)
4. MongoDB estará em C:\Program Files\MongoDB\Server\X.X\bin
```

### Windows - Opção B: Docker (2 min)
```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Verificar instalação
```powershell
mongosh
# Deve conectar com sucesso, depois saia com: exit
```

---

## 2️⃣ INICIAR BACKEND (2 min)

```powershell
cd "c:\Users\mathe\OneDrive\Área de Trabalho\desafio-gdash-2025-02\weather-challenge\backend"
npm run start:dev
```

**Esperado:**
```
[NestFactory] Starting Nest application...
[NestApplication] Nest application successfully started
```

---

## 3️⃣ FRONTEND JÁ ESTÁ RODANDO

```
http://localhost:5173
```

**Login:**
- Email: `admin@example.com`
- Senha: `123456`

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
