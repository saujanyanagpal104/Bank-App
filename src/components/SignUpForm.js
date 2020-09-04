import React, { useState, useRef } from 'react';
import bcrypt from 'bcryptjs';

const SignUpForm = ({ usedUsernames, storeData, setStoreData, setSignup }) => {
  const [formFields, setFormFields] = useState({});
  const [otherAccountNumbers, setOtherAccountNumbers] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [areFieldsEmpty, setAreFieldsEmpty] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmptyFields =
      !formFields.username ||
      !formFields.email ||
      !formFields.mobile ||
      !password;
    if (checkEmptyFields) {
      setAreFieldsEmpty(true);
    } else {
      setAreFieldsEmpty(false);
      const filterUser = usedUsernames.filter(
        (val) => val === formFields.username
      );
      if (filterUser.length) {
        setValidUsername(true);
      } else {
        setValidUsername(false);
        setStoreData({
          ...storeData,
          [formFields.username]: {
            ...formFields,
            password,
            account_balance: 10000,
            account_number: Date.now() * 54,
            id: `#${Date.now()}`,
            loan_applications: [],
            other_account_numbers: otherAccountNumbers,
            transactions_made: [],
          },
        });
        setSignup(false);
      }
    }
  };

  const handleAccountNumber = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAddingAccountNumber = (e) => {
    e.preventDefault();
    setOtherAccountNumbers([...otherAccountNumbers, accountNumber]);
    setAccountNumber('');
  };

  const removeAccountNumber = (e) => {
    const toBeRemovedAccount = e.target.parentNode.childNodes[0].innerText;
    const filterRemoevedAccount = otherAccountNumbers.filter(
      (val) => val !== toBeRemovedAccount
    );
    setOtherAccountNumbers(filterRemoevedAccount);
  };

  const handlePassword = () => {
    const hashedPassword = bcrypt.hashSync(passwordRef.current.value, 8);
    setPassword(hashedPassword);
  };

  const handleForm = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const closeForm = () => {
    setSignup(false);
  };

  return (
    <div className='signup-form-container'>
      <div className='signup-form-dialog'>
        <span className='singup-form-title'>
          <span className='register-here'>Register Here.</span>
          <span onClick={closeForm} className='close-form'>
            X
          </span>
        </span>
        <div className='signup-form'>
          <form>
            <input
              type='text'
              name='username'
              value={formFields.username || ''}
              placeholder='username'
              onChange={handleForm}
            />
            <input
              type='password'
              name='password'
              ref={passwordRef}
              placeholder='password'
              onChange={handlePassword}
            />
            <input
              type='email'
              name='email'
              placeholder='email'
              value={formFields.email || ''}
              onChange={handleForm}
            />
            <input
              type='mobile'
              name='mobile'
              placeholder='mobile'
              value={formFields.mobile || ''}
              onChange={handleForm}
            />
            <div className='account-numbers-added'>
              {otherAccountNumbers.map((acc_no) => (
                <div className='other-account-numbers'>
                  <span className='acc_no tab' key={acc_no}>
                    {acc_no}
                  </span>
                  <span className='remove-acc-no' onClick={removeAccountNumber}>
                    REMOVE
                  </span>
                </div>
              ))}
            </div>
            <input
              type='number'
              placeholder='Add Other Accounts Numbers'
              value={accountNumber}
              onChange={handleAccountNumber}
            />
            <button
              className='save-other-account-numbers button'
              onClick={handleAddingAccountNumber}
            >
              Add More accounts
            </button>
            <button className='sign-up button' onClick={handleSubmit}>
              SignUp
            </button>
            {!areFieldsEmpty && validUsername ? (
              <span className='error'>This username is already in use.</span>
            ) : null}
            {areFieldsEmpty && (
              <span className='error'>
                Cannot leave Username, Mobile, Email, Password Empty
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
