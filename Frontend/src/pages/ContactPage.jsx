import React, { useEffect, useState } from "react";
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
  Skeleton,
} from "@mui/material";
import { Search, Edit, Delete, Anchor } from "@mui/icons-material";
import AddContact from "../components/AddContact";
import EditContact from "../components/EditContact";
import DeleteContact from "../components/DeleteContact";
import AxiosPrivate from "../utils/AxiosPrivate";
import { getToken } from "../utils/getToken";

const ContactPage = () => {
  const [addDrawer, setAddDrawer] = useState(false);
  const [editDrawer, setEditDrawer] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [update,setUpdate]=useState(false)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [contacts, setContacts] = useState([]);
  const [selectedData,setSelectedData]=useState(null)
  const [loading,setloading]=useState(false)
  const filteredRows = contacts.filter((row) =>
    row.firstName.toLowerCase().includes(search.toLowerCase())
  );
  const fetchContacts = async () => {
    try {
      setloading(true)
      const {token} = await getToken(); 
      console.log("token",token)
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
  
      const data = await AxiosPrivate.get("/contacts", { headers });
      setContacts(data.data)
    } catch (error) {
      console.log(error);
    }
    finally{
      setloading(false)
    }
   
  };
  useEffect(() => {
    fetchContacts();
  }, [update]);
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
            onClick={() => {
              setAddDrawer(true);
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
      {loading?(
        <Skeleton variant="wave" sx={{
          width:"100%",
          height:"300px",
          marginTop:"20px"
        }}/>
      ):(
        <>
          <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="contacts table"
            className="bg-inherit"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Company</TableCell>
                <TableCell align="left">Job Title</TableCell>
                <TableCell align="left">Actions</TableCell>
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
                      {row.firstName}
                    </TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.jobTitle}</TableCell>
                    <TableCell align="left">{row.company}</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Edit" onClick={() =>{
                        setSelectedData(row)
                        setEditDrawer(true)}}>
                        <IconButton color="primary" size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => {
                            setSelectedData(row)
                            setDeleteModal(true)}
                          }
                        >
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
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />

        </>
      )}
        <Drawer
          open={addDrawer}
          onClose={() => setAddDrawer(false)}
          anchor="right"
          PaperProps={{
            sx: {
              width: "40%",
              height: "100%",
            },
          }}
        >
          <AddContact update={update} setAddDrawer={setAddDrawer} setUpdate={setUpdate}/>
        </Drawer>
        <Drawer
          open={editDrawer}
          onClose={() => setEditDrawer(false)}
          anchor="right"
          PaperProps={{
            sx: {
              width: "40%",
              height: "100%",
            },
          }}
        >
          <EditContact firstName={selectedData?.firstName} lastName={selectedData?.lastName} email={selectedData?.email} phone={selectedData?.phone} jobTitle={selectedData?.jobTitle} company={selectedData?.company} id={selectedData?._id} update={update} setUpdate={setUpdate} setEditdrawer={setEditDrawer}/>
        </Drawer>

        <Modal
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DeleteContact id={selectedData?._id} setDeleteModal={setDeleteModal} update={update} setUpdate={setUpdate}/>
        </Modal>
      </div>
    </div>
  );
};

export default ContactPage;
