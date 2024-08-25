# Youtube mp3 dowloader

Express/React youtube mp3 downloader that adds the option to automatically set the tracks metadata with the Spotify Api.

## Installation

Requires ffmpeg and yt-dlp to be installed on your machine and executable as ffmpeg and yt-dlp respectively. https://www.ffmpeg.org and https://github.com/yt-dlp/yt-dlp

Clone the repository

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

Navigate to the `src` folder and rename `config-exameple.ts` to `config.ts`. Then fill in your relevant information. You will need spotify api credentials to use the spotify features.
