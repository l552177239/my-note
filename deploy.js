const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const distPath = path.join(root, 'docs', '.vuepress', 'dist')
const pushBranch = 'gh-pages'
const isWin = process.platform === 'win32'
const buildCmd = isWin ? 'npm run build:win' : 'npm run build'

function run(cmd, options = {}) {
  execSync(cmd, { stdio: 'inherit', ...options })
}

run(buildCmd)

process.chdir(distPath)

const pushAddr = execSync('git remote get-url --push origin', {
  cwd: root,
  encoding: 'utf-8',
}).trim()
const commitInfo = execSync('git describe --all --always --long', {
  cwd: root,
  encoding: 'utf-8',
}).trim()

const userName = execSync('git config user.name', {
  cwd: root,
  encoding: 'utf-8',
}).trim()
const userEmail = execSync('git config user.email', {
  cwd: root,
  encoding: 'utf-8',
}).trim()

run('git init')
// 临时仓库不会继承主仓库的 local config，需显式写入后再 commit
run(`git config user.name "${userName}"`)
run(`git config user.email "${userEmail}"`)
run('git add -A')
run(`git commit -m "deploy, ${commitInfo}"`)
run(`git push -f ${pushAddr} HEAD:${pushBranch}`)

process.chdir(root)
fs.rmSync(distPath, { recursive: true, force: true })
