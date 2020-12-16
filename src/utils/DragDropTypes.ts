export const DragItemTypes = {
  LESSON: 'lesson',
} as const

export type DropResultT = {
  classTitle: string
  dayNum: number
  period: number
  id: string
}