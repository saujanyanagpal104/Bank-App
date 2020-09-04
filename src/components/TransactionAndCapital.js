import React, { useState } from 'react';
import TransactionsPage from './TransactionsPage';
import CapitalPage from './CapitalPage';

const TransactionAndCapital = ({ userDetails, setUser }) => {
  const [toggleTabs, setToggleTabs] = useState(false);

  const transactionsTab = () => {
    setToggleTabs(false);
  };

  const capitalTab = () => {
    setToggleTabs(true);
  };

  return (
    <div className='details-container'>
      <div className='tabs'>
        <span className='tab' onClick={transactionsTab}>
          Transactions
        </span>
        <span className='tab' onClick={capitalTab}>
          Capital
        </span>
      </div>
      <div className='details'>
        {toggleTabs ? (
          <CapitalPage setUser={setUser} userDetails={userDetails} />
        ) : (
          <TransactionsPage userDetails={userDetails} setUser={setUser} />
        )}
      </div>
    </div>
  );
};

export default TransactionAndCapital;
