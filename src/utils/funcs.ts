import { ClassT, LessonT, TeacherT } from './../redux/timetable/timetable.d'
import { LoadT, ScheduleT } from '../redux/schedules/sched.actions'
import { DropResultT } from './DragDropTypes'
import { daysOfTheWeek } from './daysOfTheWeek'

export const isANumber = (str: number | string): boolean => {
  return !!Number(str)
}

export const getNumbersArray = (num: number): Array<string> => {
  return [...Array(num + 1).keys()].map(String).slice(1)
}

export const isLoadIncludesItem = (item: LoadT, schedule: ScheduleT) => {
  let result = false
  schedule.load.forEach((e) => {
    if (
      e.teacher === item.teacher &&
      e.subject === item.subject &&
      e.className === item.className
    )
      result = true
  })
  return result
}

export const filterLesson = <T extends ClassT | TeacherT>(
  item: T,
  lesson: LessonT
): T => ({
  ...item,
  lessons: item.lessons.filter((lessn) => lessn.id !== lesson.id),
})

export const filterLessonIn = <T extends ClassT[] | TeacherT[]>(
  conflictLesson: LessonT,
  draftCT: T
): T => {
  //@ts-ignore
  return draftCT.map((item) => {
    if (
      item.title === conflictLesson.classTitle ||
      item.name === conflictLesson.teacher
    ) {
      return {
        ...item,
        //@ts-ignore
        lessons: item.lessons.filter((lesn) => lesn.id !== conflictLesson.id),
      }
    } else {
      return item
    }
  })
}

export const plus1Lesson = (lesson: LessonT, draftLessons: LessonT[]) => {
  return draftLessons.map((lessn) => {
    if (
      lessn.classTitle !== lesson.classTitle ||
      lessn.subject !== lesson.subject ||
      lessn.teacher !== lesson.teacher
    ) {
      return lessn
    } else if (lessn.maxLessons === lessn.currentLessons) {
      return lessn
    } else {
      return {
        ...lessn,
        currentLessons: lessn.currentLessons! + 1,
      }
    }
  })
}

export const minus1Lesson = (lesson: LessonT, draftLessons: LessonT[]) => {
  return draftLessons.map((lessn) => {
    if (lessn.id !== lesson.id) {
      return lessn
    } else if (lessn.currentLessons! <= 1) {
      return {
        ...lessn,
        currentLessons: 0,
      }
    } else {
      return {
        ...lessn,
        currentLessons: lessn.currentLessons! - 1,
      }
    }
  })
}

export const createLesson = (lesson: LessonT, dropResult: DropResultT) => ({
  subject: lesson.subject,
  teacher: lesson.teacher,
  classTitle: lesson.classTitle,
  maxLessons: lesson.maxLessons,
  id: dropResult.id,
  dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
  period: dropResult.period,
})

export const addLesson = <T extends ClassT | TeacherT>(
  item: T,
  lesson: LessonT,
  dropResult: DropResultT
): T => ({
  ...item,
  lessons: [...item.lessons, createLesson(lesson, dropResult)],
})

const editLesson = (lesson: LessonT, dropResult: DropResultT) => ({
  ...lesson,
  id: dropResult.id,
  dayOfTheWeek: daysOfTheWeek[dropResult.dayNum],
  period: dropResult.period,
})

export const editLessonIn = <T extends ClassT | TeacherT>(
  item: T,
  id: string,
  dropResult: DropResultT
): T => ({
  ...item,
  lessons: item.lessons.map((lessn) => {
    if (lessn.id === id) {
      return editLesson(lessn, dropResult)
    } else {
      return lessn
    }
  }),
})

export const resetHalfConflict = {
  isOpenModal: false,
  conflictClassLesson: null,
  conflictTeacherLesson: null,
  isConflictResolved: true,
}

export const resetAllConflict = {
  isOpenModal: false,
  conflictClassLesson: null,
  conflictTeacherLesson: null,
  isConflictResolved: null,
  source: null,
  lesson: null,
  dropResult: null,
}