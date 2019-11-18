import React from 'react';
import { useHistory } from 'react-router-dom';

import KeypadRow from 'common/keypad/KeypadRow';
import KeypadButton from 'common/keypad/KeypadButton';

export default function Error() {
  const history = useHistory();

  // On cancel redirect to withdraw view
  const handleCancel = function handleOnClick() {
    history.push('/');
  };

  return (
    <div>
      <h2 className="text-center mb-4">Oops!!</h2>
      <h4 className="text-center text-danger mb-5">Looks like something went wrong.</h4>
      <KeypadRow className="withdraw-options">
        <KeypadButton onClick={handleCancel} className="">
          Go to home page
        </KeypadButton>
      </KeypadRow>
    </div>
  );
}
