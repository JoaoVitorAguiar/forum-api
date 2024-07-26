### README

## Instalação

Este projeto é uma API para um sistema de fórum utilizando Fastify, Prisma, MySQL e Docker. Siga os passos abaixo para configurar e executar o projeto.

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker
- Docker Compose

### Passos para Configuração

1. **Clone o Repositório**

   Primeiro, clone o repositório e acesse o diretório do projeto:

   ```bash
   git clone https://github.com/JoaoVitorAguiar/forum-api.git
   cd forum-api
   ```

2. **Configure o Docker Compose**

   O projeto utiliza Docker para gerenciar o banco de dados MySQL. Crie um arquivo `docker-compose.yml` com o seguinte conteúdo:

   ```yaml
   version: "3"

   services:
     mysql-db:
       image: mysql:latest
       ports:
         - 3306:3306
       environment:
         MYSQL_ROOT_PASSWORD: root_password
         MYSQL_DATABASE: forum_db
         MYSQL_USER: user
         MYSQL_PASSWORD: user_password
       volumes:
         - mysql-data:/var/lib/mysql

   volumes:
     mysql-data:
   ```

   Este arquivo configura um contêiner MySQL com um banco de dados chamado `forum_db`, usuário `user` e senha `user_password`. O volume `mysql-data` é utilizado para persistência dos dados.

3. **Suba o Contêiner do MySQL**

   Execute o comando abaixo para iniciar o contêiner do MySQL:

   ```bash
   docker-compose up -d
   ```

   Este comando irá baixar a imagem do MySQL, criar e iniciar o contêiner, e mapear a porta 3306 do contêiner para a porta 3306 do seu host.

4. **Configure o Arquivo `.env`**

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```plaintext
   NODE_ENV=dev
   JWT_SECRET=minhachavesupersecreta@2024
   DATABASE_URL="mysql://user:user_password@localhost:3306/forum_db"
   ```

5. **Instale as Dependências**

   Instale as dependências do projeto utilizando o comando:

   ```bash
   npm install
   ```

6. **Aplique as Migrações do Prisma**

   Após iniciar o contêiner do MySQL, aplique as migrações do Prisma para configurar o banco de dados:

   ```bash
   npx prisma migrate dev
   ```

   Caso encontre erros de permissão ao executar as migrações, verifique se o usuário MySQL especificado no arquivo `docker-compose.yml` possui permissões adequadas para criar e modificar esquemas no banco de dados. Ajuste as permissões conforme necessário.

7. **Inicie o Servidor**

   Para iniciar o servidor Fastify, use o comando:

   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

### Erros Comuns

- **Erro de Permissão MySQL**: Se você encontrar erros de permissão ao aplicar as migrações, é provável que o usuário MySQL não tenha permissões adequadas. Certifique-se de que o usuário `user` especificado no arquivo `docker-compose.yml` tenha permissões para criar e modificar bancos de dados e tabelas. Você pode ajustar as permissões diretamente no MySQL, se necessário.
