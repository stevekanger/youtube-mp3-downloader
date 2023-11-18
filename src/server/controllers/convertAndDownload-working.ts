import { Request, Response } from 'express'
import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'

/*
Necessary workaround for unexpected token error. Change the following lines in sig.js of the ytdl-core package
Refrenced here https://github.com/fent/node-ytdl-core/issues/1108#issuecomment-1212705953

--- a/lib/sig.js
+++ b/lib/sig.js
@@ -63,5 +63,7 @@
       if (ndx >= 0) {
-        const subBody = body.slice(ndx + functionStart.length);
-        const functionBody = `var ${functionStart}${utils.cutAfterJSON(subBody)};${functionName}(ncode);`;
+        const end = body.indexOf('.join("")};', ndx);
+        const subBody = body.slice(ndx, end);
+        
+        const functionBody = `${subBody}.join("")};${functionName}(ncode);`;
         functions.push(functionBody);
}
*/

export default async function download(req: Request, res: Response) {
  try {
    const { video, meta, fileName } = req.body

    let stream = ytdl(video.id, {
      quality: 'highestaudio',
    })

    const outputOptions = Object.entries(meta).reduce(
      (prev: string[], [key, value]) => {
        return [...prev, '-metadata', `${key}=${value}`]
      },
      [],
    )

    const tempFileName = uuid()
    const tempFilePath = path.join(__dirname, tempFileName)
    stream.pipe(fs.createWriteStream(tempFilePath))

    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}.mp3`)

    stream.on('end', () => {
      const ffmpegCommand = ffmpeg()
        .input(tempFilePath)
        .audioCodec('libmp3lame')
        .audioBitrate(192)
        .toFormat('mp3')
        .outputOptions(outputOptions)
        .on('end', () => {
          console.log('Conversion finished')
          // Optionally, remove the temporary file
          fs.unlinkSync(tempFilePath)
        })
        .on('error', (err, stdout, stderr) => {
          console.error('Error during conversion:', err)
          console.error('ffmpeg stdout:', stdout)
          console.error('ffmpeg stderr:', stderr)
          // Optionally, remove the temporary file on error
          fs.unlinkSync(tempFilePath)
          res.status(500).json({
            success: false,
            msg: 'There was an error during conversion.',
          })
        })

      ffmpegCommand.pipe(res, { end: true })
    })

    stream.on('error', (error) => {
      console.error('Error downloading video stream:', error)
      res.status(500).json({
        success: false,
        msg: 'There was an error downloading video stream.',
      })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      msg: 'Unknown error',
    })
  }
}
