import { LessonT } from "../redux/timetable/timetable"

export const DragItemTypes = {
  LESSON: 'lesson',
} as const

export type DropResultT = {
  classTitle: string
  dayNum: number
  period: LessonT['period']
  id: string
  target: 'timetable' | 'footer'
}
