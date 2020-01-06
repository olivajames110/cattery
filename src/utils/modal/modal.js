import React from "react";
import "./modal.css";

const Modal = props => {
  const plusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="plus"
      class="svg-inline--fa fa-plus fa-w-14"
      role="img"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      />
    </svg>
  );
  return (
    <div className="modal-container">
      <div className="backdrop">
        <div id="modal">
          <div onClick={props.click} className="close-btn">
            {plusIcon}
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
