import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const LoanRecord = ({ record }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className='loan-record'>
      <span className='loan-record-entry'>{record.date}</span>
      <span className='loan-record-entry'>{record.documentSelected}</span>
      <span className='loan-record-entry'>
        {record.isPDF ? (
          <Document file={record.preview} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        ) : (
          <img src={record.preview} alt='preview' />
        )}
      </span>
      <span className='loan-record-entry'>INR {record.amount}</span>
      <span className='loan-record-entry loan-record-status'>
        {record.status}
      </span>
    </div>
  );
};

export default LoanRecord;
