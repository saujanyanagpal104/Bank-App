import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { DOCUMENTS_ACCEPTED } from '../utils/constants';

const UploadDocument = ({ setUser, userDetails }) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [fileUploaded, setFileUploaded] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [formFields, setFormFields] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isPDF, setIsPDF] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formFields.documentSelected ||
      !formFields.amount ||
      !fileUploaded.name
    ) {
      setIsValid(true);
    } else {
      setImagePreview(false);
      setPdfPreview(false);
      setIsValid(false);
      setUser(
        Object.assign({}, userDetails, {
          loan_applications: [
            ...userDetails.loan_applications,
            {
              ...formFields,
              fileUploaded,
              date: moment().format('DD-MM-YYYY'),
              status: 'In Progress...',
              preview: isPDF ? pdfPreview : imagePreview,
              isPDF: isPDF,
              loan_id: Date.now(),
            },
          ],
        })
      );
      setFormFields({});
    }
  };

  const handleFile = (e) => {
    handleUpload(e, e.target.files[0]);
    if (e.target.files[0]) {
      setFileUploaded(e.target.files[0]);
      if (e.target.files[0].type.includes('pdf')) {
        setIsPDF(true);
        setImagePreview(false);
        setPdfPreview(e.target.files[0]);
      } else {
        setPdfPreview(false);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleDrop = (e) => {
    handleUpload(e, e.dataTransfer.files[0]);
    if (e.dataTransfer.files[0]) {
      setFileUploaded(e.dataTransfer.files[0]);
      if (e.dataTransfer.files[0].type.includes('pdf')) {
        setIsPDF(true);
        setImagePreview(false);
        setPdfPreview(e.dataTransfer.files[0]);
      } else {
        setPdfPreview(false);
        setImagePreview(URL.createObjectURL(e.dataTransfer.files[0]));
      }
    }
  };

  const handleUpload = async (e, uploadedFile) => {
    e.preventDefault();
    const data = new FormData();
    data.append('uploadedFile', uploadedFile);
    await axios
      .post('http://localhost:5000/upload', data)
      .then((res) => (res.status === 200 ? setIsUploaded(true) : null));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleForm = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='upload-form'>
      <span className='upload-title'>Upload Document</span>
      <form>
        <select
          value={formFields.documentSelected || 'Document'}
          onChange={handleForm}
          name='documentSelected'
        >
          <option value={'Document'} disabled>
            Choose Document
          </option>
          {DOCUMENTS_ACCEPTED.map((document, index) => (
            <option value={document} key={index}>
              {document}
            </option>
          ))}
        </select>
        <input
          type='number'
          placeholder='Amount(in INR)'
          value={formFields.amount || ''}
          onChange={handleForm}
          name='amount'
        />
        <input
          type='file'
          placeholder='Drop Files Here'
          name='uploadedFile'
          onChange={handleFile}
          onDrop={handleDrop}
          value={''}
        />
        <span className='drop-files'>*You can also drop files</span>
        {isUploaded && imagePreview ? (
          <img src={imagePreview} alt='preview' />
        ) : null}
        {isUploaded && pdfPreview ? (
          <Document file={pdfPreview} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        ) : null}
        <button className='button' onClick={handleSubmit}>
          Submit
        </button>
        {isValid && <span className='error'>Don't leave any field empty</span>}
      </form>
    </div>
  );
};

export default UploadDocument;
