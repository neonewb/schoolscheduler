import { makeStyles } from "@material-ui/core";

export const useStylesEdit = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw'
  },
  editBar: {
    display: 'flex',
    minWidth: 400
  },
  dashboardIcon: {
    display: 'inline'
  },
  // titleInput: {
  //   '$notchedOutline': {
  //     borderColor: `white !important`,
  //   }
  // }
}))