import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getToken } from '../utils/getToken';
import AxiosPrivate from '../utils/AxiosPrivate';

const DeleteContact = ({id,setDeleteModal,update,setUpdate}) => {
    const [loading,setLoading]=useState(false)
    const deleteContact=async()=>{
        try {
            setLoading(true)
            const {token} = await getToken(); 
        console.log("token",token)
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
    
        const data = await AxiosPrivate.delete(`/contacts/${id}`,{ headers });
        setUpdate(!update)
        setDeleteModal(false)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
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
      onClick={deleteContact}
        sx={{ px: 3 }}
      >
       {loading?<CircularProgress color="inherit"/>:"Delete"}
      </Button>
      <Button
        variant="outlined"
        color="primary"
       onClick={()=>setDeleteModal(false)}
        sx={{ px: 3 }}
      >
        No, Cancel
      </Button>
    </Box>
  </Box></div>
  )
}

export default DeleteContact