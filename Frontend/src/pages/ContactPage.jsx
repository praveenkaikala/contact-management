import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  TablePagination,
  Tooltip,
  Drawer,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { Search, Edit, Delete, Anchor } from "@mui/icons-material";
import AddContact from "../components/AddContact";
import EditContact from "../components/EditContact";
import DeleteContact from "../components/DeleteContact";

const ContactPage = () => {
  const [addDrawer,setAddDrawer]=useState(true)
  const [editDrawer,setEditDrawer]=useState(false)
  const [deleteModal,setDeleteModal]=useState(false)
  const rows = [
    { name: "John Doe", calories: 200, fat: 5, carbs: 20, protein: 15 },
    { name: "Jane Smith", calories: 150, fat: 2, carbs: 30, protein: 20 },
    { name: "Samuel Green", calories: 180, fat: 6, carbs: 25, protein: 18 },
    { name: "Alice Brown", calories: 220, fat: 8, carbs: 22, protein: 12 },
    { name: "Michael White", calories: 170, fat: 4, carbs: 18, protein: 10 },
  ];

  const [search, setSearch] = useState("");
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) =>
    setRowsPerPage(+event.target.value);

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-gray-700">Your Contacts</h2>
      </div>
      <div className="bd-gray-200 p-5">
        <div className="flex gap-3 flex-row-reverse">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="mt-4"
            onClick={()=>{
              setAddDrawer(true)
            }}
          >
            Add Contact
          </Button>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Contacts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="contacts table"
            className="bg-inherit"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Company</TableCell>
                <TableCell align="right">Job Title</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit" onClick={()=>setEditDrawer(true)}>

                      <IconButton color="primary" size="small">
                        <Edit />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">

                      <IconButton color="error" size="small" onClick={()=>setDeleteModal(true)}>
                        <Delete />
                      </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />


<Drawer open={addDrawer} onClose={()=>setAddDrawer(false) } anchor="right" 
   PaperProps={{
    sx: {
      width: '40%', 
      height: '100%',
    },
  }}>
    <AddContact/>
</Drawer>
<Drawer open={editDrawer} onClose={()=>setEditDrawer(false) } anchor="right" 
   PaperProps={{
    sx: {
      width: '40%', 
      height: '100%',
    },
  }}>
    <EditContact/>
</Drawer>

<Modal
      open={deleteModal}
      onClose={()=>setDeleteModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DeleteContact/>
    </Modal>

      </div>
    </div>
  );
};

export default ContactPage;
