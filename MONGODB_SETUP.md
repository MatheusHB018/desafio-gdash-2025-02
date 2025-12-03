# 🗄️ Guia de Instalação e Configuração do MongoDB

## Status Atual ✅
- ✅ Backend NestJS: Código pronto, dependências instaladas
- ✅ Frontend React: Rodando em http://localhost:5173
- ✅ Código compilado e testado
- ⏳ **Esperando: MongoDB instalado localmente**

---

## 📥 Instalação do MongoDB no Windows

### Opção 1: MongoDB Community Edition (Recomendado)

1. **Baixe o instalador:**
   - Acesse: https://www.mongodb.com/try/download/community
   - Selecione:
     - **Platform:** Windows
     - **Package:** MSI
   - Clique em "Download"

2. **Execute o instalador:**
   - Abra o arquivo `.msi` baixado
   - Aceite os termos de licença
   - Recomendado: Deixe as opções padrão
   - Instale como "MongoDB Community Server"

3. **Verifique a instalação:**
   ```powershell
   mongod --version
   ```
   - Deve retornar algo como: `db version v7.0.0`

4. **Inicie o serviço MongoDB:**
   
   **Opção A: Como Serviço do Windows (automático ao iniciar)**
   ```powershell
   # O MongoDB deve ter sido instalado como serviço
   # Você pode verificar isso em:
   # Services (services.msc) → Procure por "MongoDB"
   ```

   **Opção B: Iniciar manualmente via terminal:**
   ```powershell
   mongod --dbpath "C:\data\db"
   ```
   - Crie a pasta `C:\data\db` antes se não existir:
   ```powershell
   New-Item -ItemType Directory -Path "C:\data\db" -Force
   ```

5. **Verifique se está rodando:**
   ```powershell
   # Em OUTRO terminal/PowerShell:
   mongosh
   ```
   - Deve conectar com sucesso no MongoDB

---

### Opção 2: MongoDB via Docker (Alternativa)

Se preferir usar Docker (mais fácil):

```powershell
# Inicie Docker Desktop primeiro

# Execute:
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verifique:
docker logs mongodb
```

---

## ✅ Verificar que MongoDB está rodando

Execute este comando em PowerShell:

```powershell
$mongoRunning = $false
try {
    $client = New-Object System.Net.Sockets.TcpClient
    $client.Connect('localhost', 27017)
    $mongoRunning = $true
    $client.Close()
} catch {
    $mongoRunning = $false
}

if ($mongoRunning) {
    Write-Host "✅ MongoDB está RODANDO na porta 27017" -ForegroundColor Green
} else {
    Write-Host "❌ MongoDB NÃO está rodando" -ForegroundColor Red
}
```

---

## 🚀 Após instalar MongoDB

### 1. Inicie o Backend:

```powershell
cd "c:\Users\mathe\OneDrive\Área de Trabalho\desafio-gdash-2025-02\weather-challenge\backend"
npm run start:dev
```

**Resultado esperado:**
```
[NestFactory] Starting Nest application...
[InstanceLoader] MongooseModule dependencies initialized +123ms
[InstanceLoader] ConfigModule dependencies initialized +5ms
[InstanceLoader] AuthModule dependencies initialized +10ms
[InstanceLoader] UsersModule dependencies initialized +8ms
[InstanceLoader] WeatherModule dependencies initialized +9ms
[InstanceLoader] ExplorerModule dependencies initialized +7ms
[NestApplication] Nest application successfully started +45ms
```

### 2. Teste a API:

```powershell
# Em outro terminal:
curl -X POST http://localhost:3000/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@example.com","password":"123456"}'
```

**Resposta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Admin",
    "email": "admin@example.com"
  }
}
```

### 3. Frontend já está pronto:

- Abra: http://localhost:5173
- Login: `admin@example.com` / `123456`
- Dashboard deve exibir dados em tempo real

---

## 🔧 Configuração do Backend (já feita)

O arquivo `.env` está configurado para:

```dotenv
DATABASE_URL=mongodb://localhost:27017/weather_db
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
PORT=3000
```

**Nenhuma alteração necessária!** Quando MongoDB estiver rodando, o Backend conectará automaticamente.

---

## 📋 Checklist Antes do Commit

- [ ] MongoDB instalado e rodando em localhost:27017
- [ ] Backend iniciado com `npm run start:dev`
- [ ] Backend conectou com sucesso ao MongoDB
- [ ] Frontend aberto em http://localhost:5173
- [ ] Login funcional com admin@example.com / 123456
- [ ] Dashboard exibindo dados (após alguns segundos)
- [ ] Tudo compilando sem erros

---

## 💾 Próximos Passos (Depois de testar)

1. **Testar Python Collector** (coleta dados de weather)
2. **Testar Go Worker** (processa fila RabbitMQ)
3. **Fazer commit** com todas as mudanças
4. **Gravar vídeo** de demonstração (5 minutos)
5. **Criar Pull Request**

---

## 📞 Troubleshooting

### "Connection refused" na porta 27017?
- MongoDB não está rodando
- Verifique: `mongosh` deve conectar com sucesso
- Inicie manualmente: `mongod --dbpath "C:\data\db"`

### Backend não encontra MongoDB mesmo com daemon rodando?
- Verifique firewall do Windows
- Tente: `Get-NetFirewallRule -DisplayName "MongoDB"`
- Se necessário, libere a porta 27017

### "EADDRINUSE" na porta 3000?
- Algo já está usando a porta 3000
- Veja qual processo: `netstat -ano | findstr ":3000"`
- Encerre com: `taskkill /PID <PID> /F`

---

## ✨ Lembrete

Você tem **TODO O CÓDIGO PRONTO** para rodar. Basta:
1. Instalar MongoDB
2. Ter MongoDB rodando em localhost:27017
3. Executar `npm run start:dev` no backend
4. Frontend já está rodando em http://localhost:5173

**Sucesso! 🚀**
