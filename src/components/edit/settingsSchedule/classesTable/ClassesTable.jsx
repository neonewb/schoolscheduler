import React from 'react'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import ClassesTableHead from './TableHead'
import ClassesTableBody from './TableBody'

const ClassesTable = ({ mySchedule }) => {

  return (
    <TableContainer>
      <Table size='small' aria-label='Classes table'>
        <ClassesTableHead
          numberOfColumns={mySchedule.numberOfColumns}
          schedID={mySchedule.id}
          checked={mySchedule.checked}
          classes={mySchedule.classes}
        />
        <ClassesTableBody 
          numberOfColumns={mySchedule.numberOfColumns}
          checked={mySchedule.checked}
          schedID={mySchedule.id}
          classes={mySchedule.classes}
        />
      </Table>
    </TableContainer>
  )
}

export default ClassesTable
