import { DaysOfTheWeekT } from "../../utils/daysOfTheWeek"

export enum TtAcTypes {
  MANUALLY_CREATE_SCHEDULE = 'MANUALLY_CREATE_SCHEDULE',
  CLEAR_TIMETABLE = 'CLEAR_TIMETABLE',
}

export type LessonT = {
  id: string
  subject: string
  teacher: string
  className?: string
  dayOfTheWeek?: DaysOfTheWeekT
  lessonNumber?: number
}

export type ClassT = {
  name: string
  lessons: Array<LessonT>
}

export type TeacherT = {
  name: string
  lessons: Array<LessonT>
}