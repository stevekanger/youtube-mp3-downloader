# Youbube Mp3 Downloader

## Getting Started

Clone or download the repo and run

```bash
npm install
```

First create a mysql database. Copy `.env.example` to `.env` and change your credentials.

```bash
npx prisma generate
```

and

```bash
npx prisma migrate dev --name chose_your_migration_name
```

## Development

Run the development server:

```bash
npm run dev
```
