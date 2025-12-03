# 🆘 TROUBLESHOOTING - Soluções Rápidas

## 🔴 Problema: MongoDB não conecta

### Sintoma
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

### Solução
```powershell
# Opção 1: Verifique se está instalado
mongod --version

# Opção 2: Inicie manualmente
# Crie pasta de dados:
New-Item -ItemType Directory -Path "C:\data\db" -Force

# Inicie MongoDB:
mongod --dbpath "C:\data\db"

# Opção 3: Ou use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Opção 4: Verifique se está rodando
mongosh
# Se conectou, ótimo! Saia com: exit
```

---

## 🔴 Problema: Backend não inicia

### Sintoma
```
Error: Cannot find module '@nestjs/core'
```

### Solução
```powershell
cd backend

# Reinstale dependências
npm install

# Se ainda não funcionar, delete e refaça
rm -r node_modules package-lock.json
npm install

# Depois tente
npm run start:dev
```

### Sintoma
```
Port 3000 is already in use
```

### Solução
```powershell
# Find processo using port 3000
netstat -ano | findstr ":3000"

# Kill processo (troque <PID> com o número)
taskkill /PID <PID> /F

# Ou use porta diferente
PORT=3001 npm run start:dev
```

---

## 🔴 Problema: Frontend não carrega

### Sintoma
```
Cannot GET http://localhost:5173
```

### Solução
```powershell
# Frontend já deve estar rodando, mas se não:
cd frontend

npm install

npm run dev

# Deve aparecer:
# ➜  Local:   http://localhost:5173/
```

### Sintoma
```
Cannot find module 'react'
```

### Solução
```powershell
cd frontend

# Reinstale
npm install

# Ou
npm install --legacy-peer-deps
```

---

## 🔴 Problema: Login não funciona

### Sintoma
```
401 Unauthorized
```

### Verificação
1. Verifique credenciais: `admin@example.com` / `123456`
2. Verifique se Backend está rodando em localhost:3000
3. Verifique console do navegador (F12) para erro específico

### Solução
```powershell
# Teste login via curl
curl -X POST http://localhost:3000/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@example.com","password":"123456"}'

# Se retornar { access_token, user }, Backend OK
# Se retornar erro, verifique Backend logs
```

---

## 🔴 Problema: Dashboard vazia (sem dados)

### Sintoma
```
Dashboard carrega mas sem dados
AI Insights vazio
Gráficos vazios
Tabela vazia
```

### Causas possíveis
1. **MongoDB sem dados**
   - Python Collector não rodou
   - Go Worker não processa fila
   - Nenhum POST em `/api/weather/logs`

2. **API retornando erro**
   - Verifique console (F12) no navegador
   - Verifique logs do Backend
   - Teste com curl: `curl -H "Authorization: Bearer <token>" http://localhost:3000/api/weather/logs`

### Solução
```powershell
# Opção A: Iniciar Python Collector
cd weather-collector
python main.py
# Deve aparecer: "Message sent to queue"

# Opção B: Iniciar Go Worker
cd weather-worker
go run main.go
# Deve aparecer: "Consuming from queue"

# Opção C: Verificar MongoDB diretamente
mongosh
use weather_db
db.weather_logs.find().limit(5)
# Se retornar documentos, tem dados!

# Se não tem dados:
# - Verifique se Python Collector está enviando
# - Verifique se Go Worker está processando
# - Verifique se Backend está salvando
```

---

## 🔴 Problema: Token JWT expirado

### Sintoma
```
401 Unauthorized (depois de 1 hora)
```

### Solução
- Fazer logout (limpa token)
- Fazer login novamente
- Novo token será gerado

### Código automático em use-api.ts
```typescript
// Se receber 401, faz logout automaticamente
if (response.status === 401) {
  localStorage.removeItem('access_token');
  window.location.href = '/login';
}
```

---

## 🔴 Problema: CORS bloqueado

### Sintoma
```
Access to XMLHttpRequest at 'http://localhost:3000/...' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

### Solução
Verifique se Backend tem CORS habilitado:

**Arquivo: backend/src/main.ts**
```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

Se não tiver, precisa adicionar.

---

## 🔴 Problema: Vite porta 5173 em uso

### Sintoma
```
Port 5173 already in use
```

### Solução
```powershell
# Kill processo
netstat -ano | findstr ":5173"
taskkill /PID <PID> /F

# Ou use outra porta
npm run dev -- --port 3001
```

---

## 🔴 Problema: TypeScript errors

### Sintoma
```
Type 'X' is not assignable to type 'Y'
```

### Solução
```powershell
# Opção 1: Verifique tipos
# Leia a mensagem de erro completamente

# Opção 2: Delete cache
rm -r dist
rm -r .next

# Opção 3: Reinstale tipos
npm install

# Opção 4: Se usar interfaces customizadas
# Verifique se estão exportadas corretamente
# export interface WeatherLog { ... }
```

---

## 🔴 Problema: Dependências conflitando

### Sintoma
```
npm ERR! peer dep missing
npm ERR! conflicting versions
```

### Solução
```powershell
# Use flag legacy-peer-deps
npm install --legacy-peer-deps

# Ou delete e refaça
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 🔴 Problema: Docker não funciona

### Sintoma
```
Docker daemon not running
```

### Solução
1. Abra Docker Desktop
2. Aguarde iniciar (~30 segundos)
3. Tente novamente: `docker ps`

---

## 🆗 Tudo funcionando? Checklist

```
□ mongosh conecta com sucesso
□ Backend iniciou sem erros
□ http://localhost:5173 carrega
□ Login funciona
□ Dashboard exibe dados
□ Gráficos renderizam
□ Tabela tem registros
□ AI Insights mostra
□ CSV export funciona
```

Se todos ✓, você está **100% pronto!**

---

## 📞 Resumo Rápido

| Problema | Comando | Esperado |
|----------|---------|----------|
| MongoDB? | `mongosh` | Conecta |
| Backend? | `npm run start:dev` | "successfully started" |
| Frontend? | `http://localhost:5173` | Página carrega |
| Login? | Testa credenciais | Vai para Dashboard |
| Dados? | Verifique console (F12) | Sem erros |

---

## 🚨 Se nada funcionar

1. Abra seu terminal
2. Execute isto:
```powershell
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend: http://localhost:3000"
Write-Host "MongoDB: localhost:27017"
Write-Host "Credenciais: admin@example.com / 123456"
```

3. Verifique cada um manualmente
4. Se um não funciona, vá para seção específica acima
5. Leia o erro exato (não ignore!)
6. Se persistir, reinicie tudo do zero

---

**Sucesso! 🚀**
