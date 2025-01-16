FROM node:22.13-slim

RUN apt-get update && apt-get install -y wget gnupg

# Adiciona postgresql ao repositório
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ bookworm-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Instala o postgresql
RUN apt-get update && apt-get install -y postgresql-client-15

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o projeto
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]