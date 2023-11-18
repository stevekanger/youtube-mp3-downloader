import { MetaFields, Video } from '../types'

/**
 * Replaces character in a filename that will be problematic.
 *
 * @param str - current filename
 * @returns the replaced string.
 */
function replaceIllegalCharacters(str: string) {
  return str.replace(/[/\\?%*:|"<>.'`]/g, '')
}

/**
 * Check via if statements which value to use as filename then replaces illegal file characters.
 *
 * @param video - The video object from the store
 * @param meta - The currently set meta values
 * @returns a valie filename in string format.
 */
export default function createFilename(video: Video | null, meta: MetaFields) {
  let filename: string
  if (meta.artist && meta.title) {
    filename = `${meta.artist} - ${meta.title}`
  } else if (video?.title) {
    filename = video.title
  } else {
    filename = 'output'
  }

  filename = replaceIllegalCharacters(filename)
  return filename + '.mp3'
}
