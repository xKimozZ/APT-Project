import React from "react";
import styles from "./OutlineButton.module.css";


function OutlineButton(props) {

  return (
    <div>
      <button
        role="button"
        tabIndex={props.isDisabled ?   -1 : 0}
        className={`${styles. buttonBorder} ${styles.buttonText} ${props.isInverted ? styles.buttonColorInverted : props.isDanger ? styles.buttonColorDanger : styles.buttonColor} ${!props.isDisabled && props.isFocusable ? "focusable" : ""}`}
        onClick={props.btnClick}
        disabled={props.isDisabled}
      >
        {props.children}
      </button>
    </div>
  );
}

// Set a default value for colorInverted if not provided
OutlineButton.defaultProps = {
  isInverted: false,
};

export default OutlineButton;
