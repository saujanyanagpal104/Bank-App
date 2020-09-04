import React from 'react';

const TransactionRecord = ({ transaction }) => {
  return (
    <div className='transaction-record-container'>
      <span className='transaction-record-block'>{transaction.date}</span>
      <span className='transaction-record-block'>
        {transaction.beneficiary_name}
      </span>
      <span className='transaction-record-block'>
        {transaction.payment_type}
      </span>
      <span className='transaction-record-block'>INR {transaction.amount}</span>
    </div>
  );
};

export default TransactionRecord;
