import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = resolve(rootDir, 'src/assets/opening-cover-small.b64.txt')
const outputPath = resolve(rootDir, 'src/assets/opening-cover-small.jpg')

const base64 = readFileSync(sourcePath, 'utf8').replace(/\s+/g, '')
writeFileSync(outputPath, Buffer.from(base64, 'base64'))
