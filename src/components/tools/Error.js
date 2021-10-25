import React from "react";

const Error = (error, clearError) => {
  if (error) {
    setTimeout(() => {
      try{
        clearError();
      }catch(e){} // ignore
    }, 5000);
    return <div className="error" style={{backgroundColor: "#854141"}}>{ error }</div>;
  } else {
    return <div className="error"/>;
  }
}

export default Error;
