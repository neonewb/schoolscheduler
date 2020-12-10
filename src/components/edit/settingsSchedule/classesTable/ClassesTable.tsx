import React, { FC } from 'react'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import ClassesTableHead from './TableHead'
import ClassesTableBody from './TableBody'
import { ScheduleT } from '../../../../redux/database/firestore.actions'

type ClassesTableProps = {
  mySchedule: ScheduleT
}

const ClassesTable: FC<ClassesTableProps> = ({ mySchedule }) => {

  return (
    <TableContainer>
      <Table size='small' aria-label='Classes table'>
        <ClassesTableHead
          numberOfColumns={mySchedule.numberOfColumns}
          checked={mySchedule.checked}
        />
        <ClassesTableBody
          numberOfColumns={mySchedule.numberOfColumns}
          checked={mySchedule.checked}
          classes={mySchedule.classes}
        />
      </Table>
    </TableContainer>
  )
}

export default ClassesTable
