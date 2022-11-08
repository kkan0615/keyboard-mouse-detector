import { IpcRendererEvent } from 'electron'

export const useElectron = () => {
  const systems = (window as any).systems
  const renderer = (window as any).renderer

  return {
    // Systems
    dark: systems.dark as boolean,
    setMode: systems.setMode as (mode: 'light' | 'dark' | 'system') => boolean,
    openFolder: systems.openFolder as (fullPath: string) => void,
    // renderer
    send: renderer.send as <T = any>(channel: string, args?: T) => void,
    on: renderer.on as <T = any>(channel: string, listener?: (event: IpcRendererEvent, args?: T) => void) => void,
    off: renderer.off as (channel: string, listener?: (event: IpcRendererEvent) => void) => void,
    invoke: renderer.invoke as <T = any, K = any>(channel: string, args?: T) => Promise<K>,
  }
}
