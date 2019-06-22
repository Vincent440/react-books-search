import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <button className="save-btn btn px-3 m-2 btn-outline-success" {...props} tabIndex="0">
      Save Book
    </button>
  );
}

export default SaveBtn;
