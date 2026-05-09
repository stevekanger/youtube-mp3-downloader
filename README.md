# Youbube Mp3 Downloader

Really just made this for me but you can use it to your liking. Made with Next.js, Prisma, Next-Auth, and Mysql. Currently only added support for Gemini models for ai metadata completion due to their free tier.

## Features

- Converts Youtube videos to mp3 for you to download.
- Search suggestions.
- Users can have ai fill in track metadata.

## Getting Started

Requires `yt-dlp` to be installed on your machine. Then clone or download the repo and run

```bash
npm install
```

First create a mysql database. Then copy `.example.env` to `.env` and change your credentials for the database and google oauth.

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
