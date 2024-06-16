import React, { useCallback, useEffect, useState } from "react";
import { deleteFile, viewFile } from "../redux/apis/file";
import Loader from "../components/loader";
import { url } from "../Const";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Modal } from "reactstrap";
import AddEditModal from "./addEditModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ConfirmModal from "./confirmModal";
import toastResponse from "../utils/toastResponse";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
const FileList = ({ user }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [openDeleteModal, toggleDeleteModalOpen] = useState();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [deletedIds, setDeletedIds] = useState([]);
  const [totalFile, setTotalFile] = useState();
  const [refresh,setRefresh] = useState(true)
  const limit = 5;

 
  const callListApi = useCallback(async () => {
    setLoading(true);
    try {
      const response = await viewFile(page, limit);
      setData(response.data.data);
      setTotalFile(response.data.totalFile);
      setLoading(false);
      setRefresh(false)
    } catch (error) {
      setLoading(false);
      setRefresh(false)
    }
  }, [page]);


  useEffect(() => {
    refresh && callListApi();
  }, [refresh, page]);

  const handleSelectRow = (id) => {
    setDeletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMultiDelete = () => {
    let data = {
      ids: deletedIds,
    };
    deleteFile(data)
      .then((e) => {
        if (e.success) {
          toastResponse.success(e.message);
          toggleDeleteModalOpen(false);
          setRefresh(true)
        } else {
          toastResponse.error(data.message);
        }
      })
      .catch((err) => {
        toastResponse.error(err.message);
      });
    setDeletedIds([]);
    setShowCheckboxes(false);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setRefresh(true)
  };

  const handleDownloadClick = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded_image";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div style={{ height: data.length < 3 ? "400px" : "auto" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {user == "admin" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 2,
                marginRight: 2,
                marginBottom: 2,
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{ marginLeft: 1, marginRight: 1 }}
                onClick={(e) => setModal(true)}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteSweepIcon />}
                sx={{ marginLeft: 1, marginRight: 1 }}
                onClick={(e) => {
                  setShowCheckboxes((prev) => !prev);
                }}
              >
                {showCheckboxes ? "Cancel Multi Delete" : "Multi Delete"}
              </Button>
              {deletedIds.length ? (
                <Button
                  onClick={handleMultiDelete}
                  variant="contained"
                  color="secondary"
                >
                  Delete Selected
                </Button>
              ) : null}
            </Box>
          ) : null}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell align="right">File Description</TableCell>
                  <TableCell align="right">File Size</TableCell>
                  <TableCell align="right">File Type</TableCell>
                  <TableCell align="right">File</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {showCheckboxes && (
                        <Checkbox
                          checked={deletedIds.includes(row._id)}
                          onChange={() => handleSelectRow(row._id)}
                        />
                      )}
                      {row.fileName}
                    </TableCell>
                    <TableCell align="right">{row.fileDescription}</TableCell>
                    <TableCell align="right">{row.size}(in KB)</TableCell>
                    <TableCell align="right">{row.fileType}</TableCell>

                    <TableCell
                      align="right"
                      sx={{ justifyContent: "end", display: "flex" }}
                    >
                      {row.fileType === "image" ? (
                        <Avatar
                          alt={row.fileName}
                          src={`${url}/${row.file}`}
                          sx={{ width: 56, height: 56 }}
                        />
                      ) : row.fileType === "pdf" ? (

                        <Tooltip title="View Pdf">
 <IconButton
                          onClick={() =>
                            window.open(`${url}/${row.file}`, "_blank")
                          }
                        >
                          <PictureAsPdfIcon />
                        </IconButton>
</Tooltip>
                        
                      ) : row.fileType === "video" ? (
                        <Tooltip title="View video">
                        <IconButton
                          onClick={() =>
                            window.open(`${url}/${row.file}`, "_blank")
                          }
                        >
                          <VideoChatIcon />
                        </IconButton>
                        </Tooltip>

                      ) : 
                      
                      <Tooltip title="View doc">
                        <IconButton
                          onClick={() =>
                            window.open(`${url}/${row.file}`, "_blank")
                          }
                        >
                          <FolderCopyIcon />
                        </IconButton>
                        </Tooltip>
                      }
                    </TableCell>
                    <TableCell align="right">
                      {user === "admin" && (
                        <>
                                              <Tooltip title="edit">

                          <IconButton
                            aria-label="edit"
                            onClick={(e) => {
                              setIsEdit(true);
                              setModal(true);
                              setEditData(row);
                            }}
                          >
                           
                            <EditIcon fontSize="small" color="primary" />
                          </IconButton>
                          </Tooltip>
                          <Tooltip title="delete">

                          <IconButton
                            aria-label="delete"
                            onClick={(e) => {
                              let aa = [];
                              aa.push(row._id);
                              setDeletedIds(aa);
                              toggleDeleteModalOpen(true);
                            }}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                          </Tooltip>

                        </>
                      )}
                          <Tooltip title="download">

                      <IconButton
                        onClick={(e) =>
                          handleDownloadClick(`${url}/${row.file}`)
                        }
                      >
                        <DownloadForOfflineIcon
                          fontSize="small"
                          color="secondary"
                        />
                      </IconButton>
                      </Tooltip>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              sx={{ margin: 2 }}
              count={Math.ceil(totalFile / limit)}
              color="primary"
              page={page}
              onChange={handlePageChange}
            />
          </TableContainer>
        </>
      )}
      <Modal isOpen={modal} backdrop={true}>
        {modal && (
          <AddEditModal
            isEdit={isEdit}
            editData={editData}
            onClose={() => {
              setModal(false);
              setIsEdit(false);
              setEditData({});
            }}
            toggleRefresh={(e) => {
              setModal(false);
              setRefresh(true);
            }}
          />
        )}
      </Modal>

      <Modal isOpen={openDeleteModal} backdrop={true}>
        {openDeleteModal && (
          <ConfirmModal
            isOpen={openDeleteModal}
            onClose={() => toggleDeleteModalOpen(false)}
            confirmText={"Delete"}
            cancelBtnBsStyle=" modalcancelbutton btn btn-secondary"
            message={"Are you sure you want to delete?"}
            handleConfirm={() => handleMultiDelete()}
          />
        )}
      </Modal>
    </div>
  );
};

export default FileList;
