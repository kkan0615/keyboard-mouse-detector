import { contextBridge, ipcRenderer, IpcRendererEvent, nativeTheme, shell } from 'electron'

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('systems', {
  dark: () => nativeTheme.shouldUseDarkColors,
  setMode: (mode: 'light' | 'dark' | 'system') => {
    nativeTheme.themeSource = mode
    return nativeTheme.shouldUseDarkColors
  },
  openFolder: (fullPath: string) => {
    shell.showItemInFolder(fullPath)
  }
})

contextBridge.exposeInMainWorld('renderer', {
  send: <T = any>(channel: string, args?: T) => ipcRenderer.send(channel, args),
  on: <T = any>(channel: string, listener: (event: IpcRendererEvent, args?: T) => void) => ipcRenderer.on(channel, listener),
  off: () => (channel: string, listener: (event: IpcRendererEvent) => void) => ipcRenderer.off(channel, listener),
  invoke: async <T = any>(channel: string, args?: T): Promise<any> => await ipcRenderer.invoke(channel, args),
})
