import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <span className="save-btn btn px-3 m-2 btn-outline-success" {...props} role="button" tabIndex="0">
      Save Book
    </span>
  );
}

export default SaveBtn;
