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
      item?.title === conflictLesson.classTitle ||
      item?.name === conflictLesson.teacher
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
} as const

export const resetAllConflict = {
  isOpenModal: false,
  conflictClassLesson: null,
  conflictTeacherLesson: null,
  isConflictResolved: null,
  source: null,
  lesson: null,
  dropResult: null,
} as const

export const checkDropConflict = (
  classLessons: LessonT[] | undefined,
  teacherLessons: LessonT[] | undefined,
  dropResult: DropResultT,
  source: 'timetable' | 'footer',
  lesson: LessonT
) => {
  if (classLessons?.length !== 0 || teacherLessons?.length !== 0) {
    const conflictClassLesson = classLessons?.find(
      (les) =>
        les.dayOfTheWeek === daysOfTheWeek[dropResult.dayNum] &&
        les.period === dropResult.period
    )
    const conflictTeacherLesson = teacherLessons?.find(
      (les) =>
        les.dayOfTheWeek === daysOfTheWeek[dropResult.dayNum] &&
        les.period === dropResult.period
    )
    if (conflictClassLesson || conflictTeacherLesson) {
      return {
        isOpenModal: true,
        source,
        lesson: lesson,
        dropResult: dropResult,
        conflictClassLesson: conflictClassLesson || null,
        conflictTeacherLesson: conflictTeacherLesson || null,
        isConflictResolved: false,
      }
    } else {
      return resetAllConflict
    }
  } else {
    return resetAllConflict
  }
}

const hasFirstInt = (n: string) => /^\d+/.test(n)

export const compareWithInt = (a: string, b: string) => {
  // Check number in start of the string and compare them
  if (hasFirstInt(a) && hasFirstInt(b)) {
    if (parseInt(a) < parseInt(b)) {
      return -1
    } else if (parseInt(a) > parseInt(b)) {
      return 1
    } // Numbers are equal, compare as strings
    else if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    } else {
      return 0
    }
  } else if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    // a must be equal to b
    return 0
  }
}

export const compareLoad = (a: LoadT, b: LoadT) => {
  // Compare subjects
  if (a.subject < b.subject) {
    return -1
  } else if (a.subject > b.subject) {
    return 1
  } // Subjects are equal, compare class titles
  // Check number in start of the class name and compare them
  else if (hasFirstInt(a.className) && hasFirstInt(b.className)) {
    if (parseInt(a.className) < parseInt(b.className)) {
      return -1
    } else if (parseInt(a.className) > parseInt(b.className)) {
      return 1
    } // Numbers are equal, compare as strings
    else if (a.className < b.className) {
      return -1
    } else if (a.className > b.className) {
      return 1
    }
    // Class titles are equal, compare teachers
    else if (a.teacher < b.teacher) {
      return -1
    } else if (a.teacher > b.teacher) {
      return 1
    }
  } // Subjects are equal, compare class titles
  else if (a.className < b.className) {
    return -1
  } else if (a.className > b.className) {
    return 1
  } // Class titles are equal, compare teachers
  else if (a.teacher < b.teacher) {
    return -1
  } else if (a.teacher > b.teacher) {
    return 1
  }
  // a must be equal to b
  return 0
}

export const bSearchTeacher = (sortedArray: TeacherT[], key: string) => {
  let start = 0
  let end = sortedArray.length - 1

  while (start <= end) {
    let middle = Math.floor((start + end) / 2)

    if (sortedArray[middle].name === key) {
      // found the key
      return middle
    } else if (sortedArray[middle].name < key) {
      // continue searching to the right
      start = middle + 1
    } else {
      // continue searching to the left
      end = middle - 1
    }
  }
  // key wasn't found
  return -1
}

export const bSearchClass = (sortedArray: ClassT[], key: string) => {
  let start = 0
  let end = sortedArray.length - 1

  while (start <= end) {
    let middle = Math.floor((start + end) / 2)

    if (sortedArray[middle].title === key) {
      // found the key
      return middle
    } else if (hasFirstInt(sortedArray[middle].title) && hasFirstInt(key)) {
      if (parseInt(sortedArray[middle].title) < parseInt(key)) {
        start = middle + 1
      } else if (parseInt(sortedArray[middle].title) > parseInt(key)) {
        end = middle - 1
      } else if (sortedArray[middle].title < key) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    } else if (sortedArray[middle].title < key) {
      // continue searching to the right
      start = middle + 1
    } else {
      // continue searching to the left
      end = middle - 1
    }
  }
  // key wasn't found
  return -1
}
