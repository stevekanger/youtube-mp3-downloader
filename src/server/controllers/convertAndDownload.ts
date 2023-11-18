import { Request, Response } from 'express'
import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'

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

export default async function convertAndDownload(req: Request, res: Response) {
  try {
    const { video, meta, filename } = req.body

    const videoUrl = `https://youtube.com/watch?v=${video.id}`
    const videoInfo = await ytdl.getInfo(videoUrl)
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: 'highestaudio',
    })

    res.header('Content-Disposition', `attachment; filename="${filename}"`)

    const videoStream = ytdl(videoUrl, { format: videoFormat })

    const cmd = ffmpeg()
      .input(videoStream)
      .audioCodec('libmp3lame')
      .audioBitrate(128)
      .format('mp3')
      .outputOption('-metadata', `title=${meta.title}`)
      .outputOption('-metadata', `artist=${meta.artist}`)
      .outputOption('-metadata', `album=${meta.album}`)
      .outputOption('-metadata', `genre=${meta.genre}`)
      .outputOption('-metadata', `track=${meta.track}`)
      .outputOption('-metadata', `date=${meta.date}`)
      .outputOption('-metadata', `year=${meta.year}`)

    cmd.on('error', (err) => {
      console.log(err)
      return res.status(500).json({
        success: false,
        msg: 'There was an error during processing.',
      })
    })

    cmd.pipe(res, { end: true })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'There was an error during processing.',
    })
  }
}
