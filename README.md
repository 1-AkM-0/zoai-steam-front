# ZoAI Steam - Frontend

Interface web para interação com a API do ZoAI Steam.  
Usuários podem gerar piadas com perfis da Steam, salvar e gerenciar histórico.



## Demo

https://github.com/user-attachments/assets/7440ad27-0f0d-4f44-b4ae-25065f33eadf



## Live Preview

Confira a aplicação rodando online: [ZoAI Steam Frontend](https://zoai-steam-front.vercel.app)



## Tecnologias

- React + Vite
- Context API (authProvider)
- Axios (requisições HTTP)
- TailwindCSS (UI)



## Como rodar localmente

### Pré-requisitos

- Node.js >= 20
- Backend rodando: [ZoAI Steam Backend](https://github.com/1-AkM-0/zoai-steam)

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com a URL do backend:

```env
VITE_API_URL=http://localhost:3000/api
```

Passos

```bash

# Clone o repositório
git clone https://github.com/1-AkM-0/zoai-steam-front.git

# Entre na pasta do projeto
cd zoai-steam-front

# Crie o arquivo de variáveis de ambiente
touch .env

# Abra o arquivo .env e defina a URL do backend:
VITE_API_URL=http://localhost:3000/api

# Instale as dependências
npm install

# Rode o servidor
npm run dev

```

Frontend disponível em `http://localhost:5173`





