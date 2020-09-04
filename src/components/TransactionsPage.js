import React, { useState, useEffect } from 'react';
import NewTransaction from './NewTransaction';
import TransactionDetails from './TransactionDetails';
import { SORT_BY, MODE_OF_PAYMENTS } from '../utils/constants';
import moment from 'moment';

const TransactionsPage = ({ userDetails, setUser }) => {
  const [selectedSort, setSelectedSort] = useState('Sort');
  const [selectedFilter, setSelectedFilter] = useState('Filter');
  const [transactionDetails, setTransactionDetails] = useState(userDetails.transactions_made);

  useEffect(() => {
    setTransactionDetails(userDetails.transactions_made)
  }, [userDetails.transactions_made])

  const handleFilter = (e) => {
    const filterValues = userDetails.transactions_made.filter(
      (val) => val.payment_type === e.target.value
    );
    setSelectedFilter(e.target.value);
    setTransactionDetails(filterValues);
  };

  const handleSort = (e) => {
    setSelectedSort(e.target.value);
    if (e.target.value === 'Amount') {
      setTransactionDetails(transactionDetails.sort((a, b) => parseInt(a.amount) - parseInt(b.amount)));
    } else if (e.target.value === 'Date') {
      setTransactionDetails(transactionDetails.sort(
        (a, b) =>
          moment(a.date, 'DD-MM-YYYY').format('x') -
          moment(b.date, 'DD-MM-YYYY').format('x')
      ));
    } else if (e.target.value === 'Name') {
      setTransactionDetails(transactionDetails.sort((a, b) =>
      a.beneficiary_name.localeCompare(b.beneficiary_name)
    ));
    }
  };

  return (
    <div className='transactions-container'>
      <div className='filter-and-sort'>
        <form className='form-group'>
          <select
            className='form-control'
            value={selectedFilter || 'Filter'}
            onChange={handleFilter}
          >
            <option>Filter</option>
            {MODE_OF_PAYMENTS.map((val, index) => (
              <option key={index}>{val}</option>
            ))}
          </select>
          <select
            className='form-control'
            value={selectedSort || 'Sort'}
            onChange={handleSort}
          >
            <option>Sort</option>
            {SORT_BY.map((val, index) => (
              <option key={index}>{val}</option>
            ))}
          </select>
        </form>
      </div>
      <div className='transaction-columns'>
        <NewTransaction userDetails={userDetails} setUser={setUser} />
        <TransactionDetails
          transactionDetails={transactionDetails.length ?  transactionDetails : userDetails.transactions_made}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
