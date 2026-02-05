const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const standaloneDir = path.join(root, '.next', 'standalone')

if (!fs.existsSync(standaloneDir)) {
  console.error('Папка .next/standalone не найдена. Сначала выполните: npm run build')
  process.exit(1)
}

const copyDir = (src, dest) => {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// .next/static → .next/standalone/.next/static
const staticSrc = path.join(root, '.next', 'static')
const staticDest = path.join(standaloneDir, '.next', 'static')
if (fs.existsSync(staticSrc)) {
  copyDir(staticSrc, staticDest)
  console.log('Скопировано: .next/static → .next/standalone/.next/static')
}

// public → .next/standalone/public
const publicSrc = path.join(root, 'public')
const publicDest = path.join(standaloneDir, 'public')
if (fs.existsSync(publicSrc)) {
  copyDir(publicSrc, publicDest)
  console.log('Скопировано: public → .next/standalone/public')
}

console.log('Готово. Папка для загрузки на хостинг: .next/standalone')
