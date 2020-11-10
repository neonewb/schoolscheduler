import React from 'react'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import ClassesTableHead from './classesTable/TableHead'
import ClassesTableBody from './classesTable/ClassesTableBody'

const ClassesTable = ({ mySchedule }) => {

  return (
    <TableContainer>
      <Table size='small' aria-label='Classes table'>
        <ClassesTableHead
          numberOfColumns={mySchedule.numberOfColumns}
          schedID={mySchedule.id}
          checked={mySchedule.checked}
        />
        <ClassesTableBody />
      </Table>
    </TableContainer>
  )
}

export default ClassesTable
