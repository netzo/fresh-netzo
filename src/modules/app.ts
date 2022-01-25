import io from 'socket.io-client'
import { feathers, Application } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import { Netzo, NetzoOptions } from '../types'
import { auth } from './auth'
import { getApiUrl } from './utils'

export const createApp = (options: NetzoOptions, app?: Application): Netzo => {
    if (!app) app = feathers()

    const socket = io(options?.url ?? getApiUrl())
    app.configure(socketio(socket))
    app.configure(auth(app, options))

    return app as Netzo // return all or cherry pick only certain properties from app?
}
