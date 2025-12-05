# 🗄️ Guia: MongoDB Compass - Como Usar

## 1️⃣ INSTALAR MONGODB COMPASS

### Opção A: Download do Site Oficial
1. Acesse: https://www.mongodb.com/products/compass
2. Clique em **"Download Compass"**
3. Selecione sua versão (Windows)
4. Execute o instalador `.exe`
5. Siga os passos de instalação padrão

### Opção B: Via Chocolatey (Windows)
```powershell
choco install mongodb-compass
```

---

## 2️⃣ INSTALAR MONGODB SERVER

### Opção A: MongoDB Community Edition (Recomendado)
```powershell
# Via Chocolatey
choco install mongodb-community

# OU baixar do site:
# https://www.mongodb.com/try/download/community
```

### Opção B: MongoDB Atlas (Cloud - Sem instalar localmente)
1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster
4. Copie a connection string

---

## 3️⃣ INICIAR MONGODB (Local)

### Windows com MongoDB instalado:
```powershell
# Opção 1: Como serviço Windows (automático)
# MongoDB já vem como serviço, basta aguardar iniciar

# Opção 2: Verificar se está rodando
Get-Service MongoDB | Start-Service

# Opção 3: Iniciar via comando
mongod --dbpath "C:\data\db"  # Crie a pasta antes!
```

### macOS/Linux:
```bash
# Iniciar MongoDB
brew services start mongodb-community

# Ou manualmente:
mongod
```

---

## 4️⃣ CONECTAR COMPASS AO MONGODB

### Passo 1: Abrir MongoDB Compass
- Procure por **"MongoDB Compass"** no menu Iniciar
- Abra o aplicativo

### Passo 2: Configurar Conexão

**Se MongoDB está local (localhost):**
```
Connection String:
mongodb://localhost:27017
```

**Se está no MongoDB Atlas (Cloud):**
```
Connection String: (Copie do Atlas)
mongodb+srv://username:password@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

### Passo 3: Clicar em "Connect"
- Campo de conexão já vem preenchido com `mongodb://localhost:27017`
- Clique em botão **"Connect"**
- Pronto! Você está conectado!

---

## 5️⃣ VER DADOS NO COMPASS

### Navegar nos Bancos de Dados:
1. Na esquerda, você verá lista de databases
2. Procure por **`weather_db`** (o nosso banco!)
3. Clique para expandir

### Ver as Coleções:
- `users` - Usuários registrados
- `weather_logs` - Logs de temperatura, umidade, etc
- `sessions` - Sessões ativas (se implementado)

### Ver Documentos:
1. Clique em **`weather_logs`**
2. Verá uma lista de documentos com formato JSON
3. Cada documento = um registro de weather coletado

---

## 6️⃣ VERIFICAR SE DADOS ESTÃO CHEGANDO

### Esperado ver:
```json
{
  "_id": ObjectId("..."),
  "city": "São Paulo",
  "temperature": 28.5,
  "humidity": 65,
  "windSpeed": 12.3,
  "condition": "Céu Limpo",
  "createdAt": 2024-12-05T12:30:00.000Z
}
```

### Se NÃO ver dados:
1. Python Collector pode não estar rodando
2. Go Worker pode não estar processando a fila
3. Backend pode não estar conectado ao MongoDB

---

## 7️⃣ COMMANDS ÚTEIS NO COMPASS

### Contar documentos:
```javascript
// Na aba "Aggregations", use:
db.weather_logs.countDocuments()
```

### Filtrar por cidade:
```javascript
// Na aba "Filter", adicione:
{ "city": "São Paulo" }
```

### Deletar dados de teste:
```javascript
// Na aba "Aggregations":
db.weather_logs.deleteMany({ "city": "TestCity" })
```

### Ver últimos registros:
```javascript
// Na aba "Aggregations":
db.weather_logs.find({}).sort({ createdAt: -1 }).limit(10)
```

---

## 8️⃣ CHECKLIST: TUDO PRONTO?

- [ ] MongoDB instalado (via Chocolatey ou site)
- [ ] MongoDB Compass instalado
- [ ] MongoDB Server rodando (porta 27017)
- [ ] Compass conectado em `mongodb://localhost:27017`
- [ ] Pode ver banco `weather_db`
- [ ] Backend configurado com `DATABASE_URL=mongodb://localhost:27017/weather_db`
- [ ] Backend iniciado com `npm run start:dev`
- [ ] Python Collector rodando
- [ ] Go Worker rodando
- [ ] Frontend acessível em `http://localhost:5173`

---

## 9️⃣ PRÓXIMOS PASSOS

Quando MongoDB estiver funcionando:

1. **Iniciar Backend:**
   ```powershell
   cd weather-challenge/backend
   npm run start:dev
   ```

2. **Iniciar Python Collector:**
   ```powershell
   cd weather-challenge/weather-collector
   python main.py
   ```

3. **Iniciar Go Worker:**
   ```powershell
   cd weather-challenge/weather-worker
   go run main.go
   ```

4. **Acessar Dashboard:**
   ```
   http://localhost:5173
   Credenciais: admin@example.com / 123456
   ```

5. **Verificar dados no Compass:**
   - Abrir Compass
   - Navegar para `weather_db` → `weather_logs`
   - Ver dados em tempo real chegando!

---

## 🔟 TROUBLESHOOTING

### "Cannot connect to MongoDB"
**Solução:**
```powershell
# Verificar se MongoDB está rodando
Get-Service MongoDB | Select-Object Status

# Se não estiver, iniciar:
Start-Service MongoDB

# Ou verificar porta 27017:
netstat -ano | findstr ":27017"
```

### "Connection refused"
**Solução:**
1. Verifique se MongoDB está ativo (veja acima)
2. Altere a porta em `.env` do backend se necessário
3. Reinicie MongoDB

### "Database not found"
**Solução:**
- É normal! MongoDB cria o database automaticamente
- Quando o Backend fizer a primeira inserção, `weather_db` aparecerá
- Aguarde dados chegarem do Python Collector

### "No documents in collection"
**Possível causa:**
1. Python Collector não foi iniciado
2. Go Worker não está processando a fila
3. RabbitMQ não está rodando (se usando message queue)

---

## COMANDOS RÁPIDOS

```powershell
# Windows - Instalar tudo em um comando
choco install mongodb-community mongodb-compass

# Iniciar serviço MongoDB
Start-Service MongoDB

# Parar serviço MongoDB
Stop-Service MongoDB

# Verificar status
Get-Service MongoDB

# Reiniciar
Restart-Service MongoDB
```

---

**Pronto! Agora você sabe como usar MongoDB Compass! 🎉**
