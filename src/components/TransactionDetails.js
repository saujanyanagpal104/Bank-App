import React from 'react';
import TransactionRecord from './TransactionRecord';
import { TRANSACTIONS_TABLE_HEADER } from '../utils/constants';

const TransactionDetails = ({ transactionDetails }) => {
  return (
    <div className='transaction-details-container col'>
      <div className='transaction-details-header'>
        {TRANSACTIONS_TABLE_HEADER.map((val, index) => (
          <span key={index} className='trans-header-title'>
            {val}
          </span>
        ))}
      </div>
      <div className='transaction-details'>
        {transactionDetails.map((transaction) => (
          <TransactionRecord
            key={transaction.trans_id}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionDetails;
