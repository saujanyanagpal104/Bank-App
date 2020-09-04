import React from 'react';
import UploadDocument from './UploadDocument';
import CapitalDetails from './CapitalDetails';

const CapitalPage = ({ userDetails, setUser }) => {
  return (
    <div className='capital-container'>
      <UploadDocument setUser={setUser} userDetails={userDetails} />
      <CapitalDetails userDetails={userDetails} />
    </div>
  );
};

export default CapitalPage;
