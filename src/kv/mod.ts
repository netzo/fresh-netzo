/**
 * Using ES6 proxies and async/await to dynamically, yet almost transparently
 * connect to some provider data provider
 *
 * TODO: accept an async providerGet and providerSet functions (e.g. user can decide
 * where to persist data, e.g. receiverStorage, IndexedDB, MongoDB, RESTDB etc.)
 *
 * @see see https://gist.github.com/miguelrk/f616153f4395905c2f831b6df522fcc7/edit
 */

const receiverHandler: ProxyHandler<any> = {
  get: async (target, name) => {
    if (target.prop instanceof Promise) {
      const res = await target.prop
      target[name] = res
      return res
    } else {
      return target[name]
    }
  },
  set: (obj, prop, value) => {
    obj[prop] = value
    return true
  }
}

const providerHandler: ProxyHandler<any> = {
  get: async (_target, _name) => {
    console.log('load someting from provider...')
    return await new Promise((res, rej) => {
      setTimeout(() => res("Hello world"), 1000)
    })
  },
  set: (_obj, _prop, _value) => {
    return new Promise((res, rej) => {
      console.log('save someting providerly...')
      setTimeout(() => res(true), 1000)
    }) as unknown as boolean
  }
}

export const kv = (providerGet: Function, providerSet: Function) => ({
  provider: new Proxy({}, providerHandler),
  receiver: new Proxy({}, receiverHandler),
})