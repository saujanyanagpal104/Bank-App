import React from 'react';
import LoanRecord from './LoanRecord';
import { CAPITAL_TABLE_HEADER } from '../utils/constants';

const CapitalDetails = ({ userDetails }) => {
  return (
    <div className='capital-details-container'>
      <div className='capital-details-header'>
        {CAPITAL_TABLE_HEADER.map((val, index) => (
          <span key={index} className='capital-header-title'>
            {val}
          </span>
        ))}
      </div>
      <div className='capital-records'>
        {userDetails.loan_applications.map((data) => (
          <LoanRecord key={data.loan_id} record={data} />
        ))}
      </div>
    </div>
  );
};

export default CapitalDetails;
