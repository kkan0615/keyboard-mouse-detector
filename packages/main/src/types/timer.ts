export type TimerStatus = 'IDLE' | 'PAUSED' | 'RUNNING' | 'STOP'

export interface Timer {
  startTime: string
  endTime?: string
  status: TimerStatus
  events: any[] // ANY to Event 로 변경하기
}
