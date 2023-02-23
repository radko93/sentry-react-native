// https://github.dev/beatgammit/base64-js/blob/88957c9943c7e2a0f03cdf73e71d579e433627d3/test/convert.js#L15
// License: MIT

import { fromByteArray } from '../../../src/js/vendor'

describe('base64-js', () => {
  const checks = [
    'a',
    'aa',
    'aaa',
    'hi',
    'hi!',
    'hi!!',
    'sup',
    'sup?',
    'sup?!'
  ]

  test('convert to base64 and back', () => {
    for (const check of checks) {
      const b64Str = fromByteArray(map(check, function (char: string) { return char.charCodeAt(0) }))

      const str = Buffer.from(b64Str, 'base64').toString()

      expect(check).toEqual(str)
    }
  })

  const data: [number[], string][] = [
    [[0, 0, 0], 'AAAA'],
    [[0, 0, 1], 'AAAB'],
    [[0, 1, -1], 'AAH/'],
    [[1, 1, 1], 'AQEB'],
    [[0, -73, 23], 'ALcX']
  ]

  test('convert known data to string', () => {
    for (const check of data) {
      const bytes = check[0]
      const expected = check[1]
      const actual = fromByteArray(bytes)
      expect(actual).toEqual(expected)
    }
  })

  function map(arr: string, callback: (char: string) => number): number[] {
    const res = []
    let kValue, mappedValue

    for (let k = 0, len = arr.length; k < len; k++) {
      if ((typeof arr === 'string' && !!arr.charAt(k))) {
        kValue = arr.charAt(k)
        mappedValue = callback(kValue)
        res[k] = mappedValue
      } else if (typeof arr !== 'string' && k in arr) {
        kValue = arr[k]
        mappedValue = callback(kValue)
        res[k] = mappedValue
      }
    }
    return res
  }
});
