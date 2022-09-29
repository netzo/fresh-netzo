/**
 * Using ES6 proxies and async/await to dynamically, yet almost transparently
 * connect to some remote data provider
 *
 * TODO: accept an async remoteGet and remoteSet functions (e.g. user can decide
 * where to persist data, e.g. localStorage, IndexedDB, MongoDB, RESTDB etc.)
 *
 * @see see https://gist.github.com/miguelrk/f616153f4395905c2f831b6df522fcc7/edit
 */

const receiverHandler = {
  get: async (target, name) => {
    if (target.prop instanceof Promise) {
      const res = await target.prop
      target[name] = res
      return res
    } else {
      return target[name]
    }
  },
  set: function (obj, prop, value) {
    obj[prop] = value
  }
}

const providerHandler = {
  get: async (target, name) => {
    console.log('load someting from remote...')
    return await new Promise((res, rej) => {
      setTimeout(() => res(42), 4200)
    })
  },
  set: function (obj, prop, value) {
    return new Promise((res, rej) => {
      console.log('save someting remotely...')
      setTimeout(() => res(true), 1000)
    })
  }
}

export const kv = (remoteGet, remoteSet) => ({
  remote: new Proxy({}, providerHandler),
  local: new Proxy({}, receiverHandler),
})