# API Backend - Documentação de Endpoints

## 📋 Visão Geral

Backend implementado com **NestJS** com as seguintes funcionalidades:
- ✅ Autenticação JWT
- ✅ CRUD de Usuários (com proteção JWT)
- ✅ Geração de Insights de Clima (com suporte a OpenAI/Gemini)
- ✅ Exportação de Dados (CSV/XLSX)
- ✅ Logs de Clima

---

## 🔐 Autenticação

### POST `/auth/register`
**Registrar novo usuário**

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123456"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "João Silva",
  "email": "joao@example.com",
  "createdAt": "2025-12-03T05:54:00.000Z",
  "updatedAt": "2025-12-03T05:54:00.000Z"
}
```

---

### POST `/auth/login`
**Login e obtenção do Token JWT**

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123456"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token Válido por:** 1 hora

---

## 👥 CRUD de Usuários (Protegido com JWT)

### GET `/users`
**Listar todos os usuários**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2025-12-03T05:54:00.000Z"
  }
]
```

---

### GET `/users/:id`
**Obter um usuário específico**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "João Silva",
  "email": "joao@example.com",
  "createdAt": "2025-12-03T05:54:00.000Z"
}
```

---

### PATCH `/users/:id`
**Atualizar um usuário**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Body:**
```json
{
  "name": "João Atualizado",
  "email": "joao_novo@example.com"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "João Atualizado",
  "email": "joao_novo@example.com",
  "updatedAt": "2025-12-03T06:00:00.000Z"
}
```

---

### DELETE `/users/:id`
**Deletar um usuário**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (204):** No Content

---

## 🌤️ Clima e Insights

### GET `/api/weather/logs`
**Obter últimas coletas de clima**

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "city": "São Paulo",
    "temperature": 28.5,
    "condition": "Nublado",
    "humidity": 65,
    "windSpeed": 15,
    "createdAt": "2025-12-03T05:54:00.000Z"
  }
]
```

---

### POST `/api/weather/logs`
**Registrar nova leitura de clima (Protegido com JWT)**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Body:**
```json
{
  "city": "São Paulo",
  "temperature": 28.5,
  "condition": "Nublado",
  "humidity": 65,
  "windSpeed": 15
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "city": "São Paulo",
  "temperature": 28.5,
  "condition": "Nublado",
  "humidity": 65,
  "windSpeed": 15,
  "createdAt": "2025-12-03T05:54:00.000Z"
}
```

---

### GET `/api/weather/insights`
**Gerar insights de IA sobre o clima**

**Lógica:**
- 🔥 Se `temperatura > 30°C`: Alerta de calor extremo
- ❄️ Se `temperatura < 10°C`: Alerta de frio intenso
- 🌧️ Se contém "chuva": Alerta de chuva
- 📈 Se acima da média: Tendência de aquecimento
- 📉 Se abaixo da média: Queda de temperatura
- ✅ Caso contrário: Condições estáveis

**Modo Avançado (se tiver chave de API):**
- OpenAI (GPT-3.5): Análise dinâmica via `OPENAI_API_KEY`
- Google Gemini: Análise via `GEMINI_API_KEY`

**Response (200):**
```json
{
  "summary": "🔥 Alerta de Calor: Temperaturas elevadas detectadas. Hidrate-se e evite exposição prolongada ao sol.",
  "current_temp": 32,
  "average_history": "25.3",
  "alert_level": "high",
  "last_update": "2025-12-03T05:54:00.000Z"
}
```

---

### GET `/api/weather/export/csv`
**Exportar dados de clima em CSV (Protegido com JWT)**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:** Arquivo CSV com as colunas:
```
city,temperature,humidity,windSpeed,condition,createdAt
São Paulo,28.5,65,15,Nublado,2025-12-03T05:54:00.000Z
```

---

### GET `/api/weather/export/xlsx`
**Exportar dados de clima em XLSX (Protegido com JWT)**

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:** Arquivo Excel compatível (mesmo conteúdo do CSV)

---

## 🛡️ Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 200 | OK |
| 201 | Created (Criado com sucesso) |
| 204 | No Content (Deletado com sucesso) |
| 400 | Bad Request (Dados inválidos) |
| 401 | Unauthorized (Token inválido ou expirado) |
| 404 | Not Found (Recurso não encontrado) |
| 500 | Internal Server Error |

---

## 🔧 Variáveis de Ambiente Necessárias

```env
DATABASE_URL=mongodb://localhost:27017/weather_db
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345

# Opcional - Para Insights Avançados
# OPENAI_API_KEY=sk-...
# GEMINI_API_KEY=...
```

---

## 🚀 Como Testar com cURL

### 1. Registrar novo usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123456"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123456"
  }'
```

### 3. Usar o token em requisições protegidas
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Registrar leitura de clima
```bash
curl -X POST http://localhost:3000/api/weather/logs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "city": "São Paulo",
    "temperature": 28.5,
    "condition": "Nublado",
    "humidity": 65,
    "windSpeed": 15
  }'
```

### 5. Obter insights
```bash
curl -X GET http://localhost:3000/api/weather/insights
```

### 6. Exportar CSV
```bash
curl -X GET http://localhost:3000/api/weather/export/csv \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -o weather_data.csv
```

---

## 📝 Notas Importantes

1. **Senha**: Sempre criptografada com bcrypt antes de armazenar
2. **JWT**: Token expira em 1 hora. Implemente refresh tokens em produção
3. **CORS**: Configure em produção para aceitar apenas domínios autorizados
4. **Rate Limiting**: Implemente em produção para evitar ataques
5. **Insights**: Modo simples ativo por padrão. Modo OpenAI/Gemini é optional e mais lento
