import React from 'react';
import './Spinner.css';

const Spinner = () => (
    <>
    {/* <div className="loader">Loading...</div> */}
    {/* Added new Loader */}
    <div className="lds-ripple"><div></div><div></div></div>
    </>
);

export default Spinner;