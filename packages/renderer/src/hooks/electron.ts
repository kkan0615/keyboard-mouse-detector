import { IpcRendererEvent } from 'electron'

export const useElectron = () => {
  const renderer = (window as any).renderer

  return {
    send: renderer.send as <T = any>(channel: string, args?: T) => void,
    on: renderer.on as <T = any>(channel: string, listener?: (event: IpcRendererEvent, args?: T) => void) => void,
    off: renderer.off as (channel: string, listener?: (event: IpcRendererEvent) => void) => void,
    invoke: renderer.invoke as <T = any, K = any>(channel: string, args?: T) => Promise<K>,
  }
}
