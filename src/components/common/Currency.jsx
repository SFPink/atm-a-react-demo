import React, { useContext } from 'react';
import { AtmContext } from 'context/Atm';

export default function Currency() {
  const { state } = useContext(AtmContext);
  return <span className="currency">{state.currency}</span>;
}
