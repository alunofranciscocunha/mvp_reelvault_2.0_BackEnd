# Utiliza imagem oficial do Node.js
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install --production

# Copia o restante do código
COPY . .

# Copia o script wait-for-it.sh para o container
COPY wait-for-it.sh ./

# Dá permissão de execução ao script
RUN chmod +x wait-for-it.sh

# Instala o bash
RUN apk add --no-cache bash

# Expõe a porta usada pela aplicação
EXPOSE 4000

# Comando padrão para iniciar a aplicação
CMD ["npm", "run", "start:prod"]