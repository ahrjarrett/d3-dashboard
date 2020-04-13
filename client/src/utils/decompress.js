import { gunzip } from 'zlib'

const utf8ArrayToStr = () => {
  const charCache = new Array(128) // Preallocate the cache for the common single byte chars
  const charFromCodePt = String.fromCodePoint || String.fromCharCode
  let result = []

  return function(array) {
    let codePt, byte1
    let buffLen = array.length

    result.length = 0

    for (let i = 0; i < buffLen;) {
      byte1 = array[i++]

      if (byte1 <= 0x7f) {
        codePt = byte1
      } else if (byte1 <= 0xdf) {
        codePt = ((byte1 & 0x1f) << 6) | (array[i++] & 0x3f)
      } else if (byte1 <= 0xef) {
        codePt = ((byte1 & 0x0f) << 12) | ((array[i++] & 0x3f) << 6) | (array[i++] & 0x3f)
      } else if (String.fromCodePoint) {
        codePt = ((byte1 & 0x07) << 18) | ((array[i++] & 0x3f) << 12) | ((array[i++] & 0x3f) << 6) | (array[i++] & 0x3f)
      } else {
        codePt = 63 // Cannot convert four byte code points, so use "?" instead
        i += 3
      }

      result.push(charCache[codePt] || (charCache[codePt] = charFromCodePt(codePt)))
    }

    return result.join('')
  }
}

export const unzip = data => {
  //if your data not a base64 then comment this line //
  let compressData = atob(data)

  // let compressData = data.split('').map(function(e) {
  //   return e.charCodeAt(0)
  // })

  let binData = new Uint8Array(compressData)

  gunzip(binData, function(err, dezipped) {
    const str = utf8ArrayToStr(dezipped)
    console.log('str', str)

    return str
  })
}
