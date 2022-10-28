import { ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'

export type RecordStatus = 'IDLE' | 'RUNNING' | 'PAUSE'

export interface RecordData {
  startTime: string
  endTime: string
  status: 'IDLE' | 'RUNNING' | 'PAUSE'
  events: (ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent)[]
}
