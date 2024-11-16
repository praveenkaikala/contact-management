import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const DeleteContact = () => {
  return (
    <div><Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
    }}
  >
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      gutterBottom
    >
      Do you want to delete this contact?
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
      <Button
        variant="contained"
        color="error"
      
        sx={{ px: 3 }}
      >
        Yes, Delete
      </Button>
      <Button
        variant="outlined"
        color="primary"
       
        sx={{ px: 3 }}
      >
        No, Cancel
      </Button>
    </Box>
  </Box></div>
  )
}

export default DeleteContact