// components/nav.js — inject nav into any page
import { supabase } from '../supabase.js'

export async function renderNav(containerId = 'nav') {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) { location.href = '../pages/auth.html'; return null }

  const { data: player } = await supabase
    .from('players').select('*').eq('user_id', session.user.id).single()

  if (!player) { location.href = '../pages/auth.html'; return null }

  const badgeColors = { neutral:'#c8b96e', red:'#e05555', green:'#5ec45e', elite:'#a07de0', unknown:'#666' }
  const color = badgeColors[player.badge] || badgeColors.neutral

  const root = document.getElementById(containerId)
  if (!root) return player

  // Detect if we're in pages/ subfolder
  const inPages = location.pathname.includes('/pages/')
  const base = inPages ? '../' : ''

  root.innerHTML = `
    <nav class="nav">
      <a href="${base}index.html" class="nav-logo">SuperSede</a>
      <span class="nav-player">
        <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${color};margin-right:4px;vertical-align:middle"></span>
        ${player.username} · Lvl ${player.level} · ${player.xp} XP · ◈ ${player.gold}
      </span>
      <div class="nav-links">
        <a href="${base}pages/book.html"      class="nav-link">Chapters</a>
        <a href="${base}pages/inventory.html" class="nav-link">Inventory</a>
        <a href="${base}pages/trader.html"    class="nav-link">Trader</a>
        <a href="${base}pages/lobby.html"     class="nav-link">Lobby</a>
        <a href="${base}pages/badges.html"    class="nav-link">Badges</a>
        <button onclick="signOut()" style="font-family:'Share Tech Mono',monospace;font-size:.62rem;color:#604040;background:none;border:.5px solid #604040;padding:.2rem .5rem;cursor:pointer;border-radius:2px">Sign Out</button>
      </div>
    </nav>
  `

  window.signOut = async () => {
    await supabase.auth.signOut()
    location.href = base + 'index.html'
  }

  return player
}

export function showToast(msg, isErr = false) {
  let t = document.getElementById('toast')
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t) }
  t.textContent = msg
  t.className = 'toast show' + (isErr ? ' err' : '')
  clearTimeout(t._timer)
  t._timer = setTimeout(() => t.className = 'toast', 2200)
}

export function showSysOverlay(msg, variant = 'warn') {
  let el = document.getElementById('sys-overlay')
  if (!el) { el = document.createElement('div'); el.id = 'sys-overlay'; document.body.appendChild(el) }
  el.className = 'sys-overlay' + (variant === 'info' ? ' info' : '')
  el.innerHTML = `<span>⚠</span><span>${msg}</span>`
  clearTimeout(el._timer)
  el._timer = setTimeout(() => el.remove(), 5000)
}
