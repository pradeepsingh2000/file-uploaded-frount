import React, { useEffect, useState } from 'react'
import { ModalBody, ModalHeader } from 'reactstrap';
import Loader from "../components/loader"
import { useFormik } from 'formik';
import { fileUploadSchema } from '../schema';
import { EditFile, addFile } from '../redux/apis/file';
import toastResponse from '../utils/toastResponse';
import { url, warn } from "../Const";

export default function AddEditModal(props) {
    const { isEdit, editData, onClose,toggleRefresh } = props;
    const [image, setImage] = useState();
    const [fileError, setFileError] = useState('');

    const [loading,setLoading] = useState(false)
    const initialValues = {
        fileName:"",
        fileDescription: "",
        file:"",
        image
       };
       useEffect(() => {
        isEdit && setValues({ ...editData });
      }, [editData]);

     
    const { values, errors, touched, setValues,setFieldValue,handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: fileUploadSchema,
      enableReinitialize:true,
      onSubmit: async (values) => {
        if (isEdit) {
            const myForm = new FormData();
            myForm.append('fileName', values.fileName);
            myForm.append('fileDescription', values.fileDescription);
            myForm.append('file', values.file);

            EditFile(values._id,myForm)
              .then((data) => {
                if (data.success) {
                  toastResponse.success(data.message);
                //   navigate('/home');
                toggleRefresh()
                } else {
                  toastResponse.error(data.message);
                }
              })
              .catch((err) => {
                toastResponse.error(err.message);
              });
          } else {
            // Perform file addition operation
            const myForm = new FormData();
            myForm.append('fileName', values.fileName);
            myForm.append('fileDescription', values.fileDescription);
            myForm.append('file', values.file);
          
            addFile(myForm)
              .then((data) => {
                if (data.success) {
                  toastResponse.success(data.message);
                  toggleRefresh()
                } else {
                  toastResponse.error(data.message);
                }
              })
              .catch((err) => {
                toastResponse.error(err.message);
              });
          }
        },
    });

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile.size > 5 * 1024 * 1024) { 
          setFileError('File size exceeds 5MB limit');
        } else {
          setFileError('');
          setFieldValue('file', selectedFile);
        }}}
      
  return (
    <div>
       <>
      <ModalHeader toggle={() => onClose()}>
        {isEdit ? "Edit" : "Add"} File
      </ModalHeader>
      <ModalBody>
        <form className="row g-3">
          <div className="col-12 form-group">
            <label>
              File Name{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control react-form-input "
              id="fileName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fileName}
              placeholder="File Name"
            />
            {touched.fileName && errors.fileName? (
              <p style={warn}>{errors.fileName}</p>
            ) : null}
          </div>
       

          <div className="col-12 form-group">
            <label>
              File  Description{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control react-form-input"
              id="fileDescription"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fileDescription}
              placeholder="File Description"
            />
              {touched.fileDescription && errors.fileDescription? (
              <p style={warn}>{errors.fileDescription}</p>
            ) : null}
          
          </div>
      
          <div className="col-md-6 form-group">
            <label>
              Select File <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </label>
            <input
              type="file"
              className="form-control react-form-input"
              id="image"
              onChange={handleFileChange}
              onBlur={handleBlur}
              placeholder="Image"
              accept="image/*"
            />
            {fileError && (
        <p style={{ color: 'red', fontSize: '12px' }}>{fileError}</p>
      )}
             {touched.file && errors.file? (
              <p style={warn}>{errors.file}</p>
            ) : null}
          </div>
        </form>
        <div className="row mt-4 justify-content-center">
  <button
    onClick={(e) => handleSubmit(e)}
    type="submit"
    disabled ={fileError ? true : false}
    className=" col-6 btn btn-primary mx-3 btnsize"
  >
    {isEdit ? "Update" : "Save"}
  </button>
  <button
    onClick={() => {
      onClose();
    }}
    className=" col-6 btn btn-secondary btnsize"
  >
    Cancel
  </button>
</div>

      </ModalBody>
      {loading ? <Loader /> : ""}
    </>
    </div>
  )
}

