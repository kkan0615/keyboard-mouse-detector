import ElectronStore from 'electron-store'
import { Setting } from '../types/setting'

const electronStore = new ElectronStore()

export const getSettingInStore = () => {
  return (electronStore.get('setting') || {
    input: true,
    keydown: true,
    keyup: true,
    mousedown: true,
    mouseup: true,
    mousemove: true,
    click: true,
    wheel: true,
  }) as Setting
}

export default electronStore
