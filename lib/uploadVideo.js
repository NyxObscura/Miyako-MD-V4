import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type'

export default async buffer => {
  const { ext, mime } = await fileTypeFromBuffer(buffer)
  let form = new FormData()
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
  form.append('file', blob, 'tmp.' + ext)
  let res = await fetch('https://videy.co/api/upload', {
    method: 'POST',
    body: form
  })
  let vid = await res.json()
  if (!vid) throw 'error'
  return 'https://cdn.videy.co/' + vid.id + '.mp4'
}