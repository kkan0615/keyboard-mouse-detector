import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('renderer', {
  send: () => <T = any>(channel: string, listener: (event: IpcRendererEvent, args?: T) => void) => ipcRenderer.send(channel, listener),
  on: <T = any>(channel: string, listener: (event: IpcRendererEvent, args?: T) => void) => ipcRenderer.on(channel, listener),
  off: () => (channel: string, listener: (event: IpcRendererEvent) => void) => ipcRenderer.off(channel, listener),
})
