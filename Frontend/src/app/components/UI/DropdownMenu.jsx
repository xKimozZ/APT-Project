import React from "react";
import { useState, useRef, useEffect } from "react";
import styles from "./DropdownMenu.module.css";

function DropdownMenu({choose, list, selection="Choose a user"}) {
  const [showList, setShowList] = useState(false);
  const [transition, setTransition] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selection);
  const ref = useRef(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!showList)
      setTransition(false);
    }, 350);

    showList && setTransition(true);
    return () => clearTimeout(delay);
  }, [showList]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setShowList(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    choose(item);
    setShowList(false);
    choose(item);
  };

  return (
        <div
          style={{ display: "flex", justifyContent: "center" , position:"relative"}}
        >
          <button
            style={{ fill: "#3447c3" }}
            className={styles.dropdownSelectedText}
            onClick={() => setShowList(!showList)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap:"8px",
              }}
            >
              <span style={{
                textOverflow: "ellipsis",}}>{selectedItem}</span>
              
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </button>
            <ul style={{opacity:`${showList ? "1":"0"}`,}} className={`${styles.dropdownList} `} ref={ref}>
              {list.map((item, index) => (
                <li
                style={{opacity:`${showList ? "1":"0"}`, display:`${transition ? "inherit":"none"}`}}
                  className={`${styles.dropdownListItem} ${
                    selectedItem === item ? styles.selected : ""
                  }`}
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
        </div>
  );
}

export default DropdownMenu;
