import React, { useState, useEffect } from 'react';
import { AtmContext } from 'context/Atm';

// Get current date and time
const getDateTime = function getDateTime() {
  const date = new Date();
  const dateStr = date.toDateString();
  const timeStr = date.toLocaleTimeString();

  return `${dateStr} ${timeStr}`;
};

export default function AtmHeader() {
  // Store interval ID
  let clockUpdateID = null;

  // Store current datatime
  const [dateTime, setDateTime] = useState(getDateTime());

  // Create interval to update our clock
  useEffect(() => {
    clockUpdateID = setInterval(() => {
      setDateTime(getDateTime());
    }, 1000);
  }, []);

  // Remove interval on unmount
  useEffect(
    () => () => {
      clearInterval(clockUpdateID);
    },
    []
  );

  return (
    <div className="atm-header">
      <AtmContext.Consumer>
        {context => {
          const { state } = context;
          return <div className="company-name">{state.name}</div>;
        }}
      </AtmContext.Consumer>

      <div className="datetime">{dateTime}</div>
    </div>
  );
}
