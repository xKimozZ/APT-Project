import React, { useState, useRef, useEffect } from "react";
import styles from "./RichToolbarItem.module.css"


function RichToolbarItem({ onClick, ariaLabel, ariaSelected, className, icon })
{
  return (
    <span className={`${styles.hov}`}>
      <div className={`${styles.tooltipPos}`}>
        hello
      </div>
      <button
        role="button"
        onClick={onClick}
        tabIndex={0}
        aria-label={ariaLabel}
        aria-selected={ariaSelected}
        className={`${styles.RichTextToolbarItem} ${className}`}
      >
        <span className={`${styles.miscIcon} iconE icon-add`}>
          {icon}
        </span>
      </button>
    </span>
  );
};

export default RichToolbarItem;
