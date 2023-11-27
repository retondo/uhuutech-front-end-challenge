## Requisitos do projeto

O projeto exige a v18 do Node.

### Build mode

- Para construir e servir o projeto, execute:

```bash
   npm i
   npm run build
   npx http-server dist/ -p 3000
```

O projeto estará disponível na URL `http://127.0.0.1:3000`.

Atenção: Servindo dessa maneira, as rotas, exceto "/", somente funcionam sendo acionadas pela aplicação (client side).

### Dev mode

- Para rodar o projeto execute estes comandos no terminal:

```bash
   npm i
   npm run dev
```

O projeto estará disponível na URL `http://localhost:5173`.
