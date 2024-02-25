import React from 'react'

const PaymentButtons = ({noList}) => {
  // const MAX_ROW = 7
  // const isStartOfRow = (index) =>  (index % MAX_ROW === 0)
  return (
    <div className="button-container">
      {noList.map((number, index) => (
        <React.Fragment key={index} >
          <button>£{number}</button>
        </React.Fragment>
      ))}
      <button className='last-button'>Save One Box Per Week... </button>
    </div>
  );
};

export default PaymentButtons;