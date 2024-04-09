# Brasil Nihon Kiin

## Dev

### Prisma

Pushing the schema (if you're using VS Code, you will likely need to reload the editor and also rerun Next.js):

```sh
pnpx prisma db push
```

Seeding the demo, mock data:

```sh
pnpx prisma db seed
```

### Using Ngrok for Local Development

Expose your local host to the web:

```sh
ngrok http http://localhost:3000
```
