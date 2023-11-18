# Youtube mp3 dowloader

Express/React youtube mp3 downloader that adds the option to automatically set the tracks metadata with the Spotify Api.

## Installation

```bash
git clone https://github.com/stevekanger/youtube-mp3-downloader.git

```

Install packages

```bash
npm install

```

Run the dev server

```bash
npm run dev

```

## Setup

Navigate to the `src` folder and rename `config-exameple.ts` to `config.ts`. Then fill in your relevant information.

If you get undefined token errors from ffmpeg then you may have to implement the workaround refrenced here https://github.com/fent/node-ytdl-core/issues/1108#issuecomment-1212705953
