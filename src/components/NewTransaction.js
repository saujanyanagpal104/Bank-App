import React, { useState } from 'react';
import { randomPaymentModePicker } from '../utils/helperFunctions';
import { MODE_OF_PAYMENTS } from '../utils/constants';
import moment from 'moment';

const NewTransaction = ({ userDetails, setUser }) => {
  const [formFields, setFormFields] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formFields.from || !formFields.to || !formFields.amount) {
      setIsValid(true);
    } else {
      setIsValid(false);
      const getBeneficiaryName = userDetails.transactions_made.filter(
        (user) => user.account_number === formFields.to
      )[0].beneficiary_name;
      setUser(
        Object.assign({}, userDetails, {
          transactions_made: [
            ...userDetails.transactions_made,
            {
              ...formFields,
              payment_type: randomPaymentModePicker(MODE_OF_PAYMENTS),
              date: moment().format('DD-MM-YYYY'),
              beneficiary_name: getBeneficiaryName,
              trans_id: Date.now(),
            },
          ],
        })
      );
      setFormFields({});
    }
  };

  const handleForm = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='transaction-form-container'>
      <span className='transaction-form-title'>New Transaction</span>
      <div className='transaction-form'>
        <form>
          <select
            value={formFields.from || 'From'}
            name='from'
            onChange={handleForm}
          >
            <option value={'From'} disabled>
              From
            </option>
            {userDetails.other_account_numbers.map((acc_no) => (
              <option key={acc_no}>{acc_no}</option>
            ))}
          </select>
          <select
            value={formFields.to || 'To'}
            name='to'
            onChange={handleForm}
          >
            <option value={'To'} disabled>
              To
            </option>
            {userDetails.transactions_made.map((transaction) => (
              <option key={transaction.trans_id}>
                {transaction.account_number}
              </option>
            ))}
          </select>
          <input
            type='number'
            placeholder='Amount(in INR)'
            value={formFields.amount || ''}
            name='amount'
            onChange={handleForm}
          />
          <button className='button' onClick={handleSubmit}>
            Pay
          </button>
          {isValid && (
            <span className='error'>Cannot leave any field empty.</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewTransaction;
