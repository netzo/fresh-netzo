!(function () {
  const e = window
  const i = document
  const t = 'customerly'
  const n = 'queue'
  const o = 'load'
  const r = 'settings'
  const u = e[t] = e[t] || []
  if (u.t)
    return void u.i('[customerly] SDK already initialized. Snippet included twice.')

  u.t = !0
  u.loaded = !1
  u.o = ['event', 'attribute', 'update', 'show', 'hide', 'open', 'close']
  u[n] = []
  u.i = function (t) {
    e.console && !u.debug && console.error && console.error(t)
  }
  u.u = function (e) {
    return function () {
      const t = Array.prototype.slice.call(arguments)
      return t.unshift(e), u[n].push(t), u
    }
  }
  u[o] = function (t) {
    u[r] = t || {}
    if (u.loaded)
      return void u.i('[customerly] SDK already loaded. Use customerly.update to change settings.')

    u.loaded = !0
    const e = i.createElement('script')
    e.type = 'text/javascript', e.async = !0, e.src = 'https://messenger.customerly.io/launcher.js'
    const n = i.getElementsByTagName('script')[0]
    n.parentNode.insertBefore(e, n)
  }
  u.o.forEach((t) => {
    u[t] = u.u(t)
  })
}())

window.customerly.load({
  app_id: 'd2234c26',
  singleConversation: true,
})
