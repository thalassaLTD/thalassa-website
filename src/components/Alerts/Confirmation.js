import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import React from 'react'

const Confirmation = ({openConfirm,setOpenConfirm,confirmAction,message}) => {
  return (
    <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
            <Button onClick={()=>confirmAction()} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
  )
}

export default Confirmation