This is a NextJS implementatation of basic features of Anthill.

## Getting Started

First, start PostgreSQL database and set connection string in .env file (see .env.example), install dependiencies

```bash
npm install
```

run migrations

```bash
npx prisma migrate dev
```

then start development server:

```bash
npm run dev
```

you can populate database with example data with

```bash
npm run populate-db
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

To build the project run

```bash
npm run build
```

to start production build run

```bash
npm start
```
