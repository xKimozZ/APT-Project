import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RemoveMenu.module.css";
import OutlineButton from "@/app/components/UI/OutlineButton";
import apiHandler from "@/app/utils/apiHandler.js";
import getCookies from "@/app/utils/getCookies";
import Checkbox from "./Checkbox";
import DropdownMenu from "./DropdownMenu"
import { TailSpin } from "react-loader-spinner";

/**
 * Component for rendering the grayed-out modal menu for adding removal reason
 * @component
 * @param   {Function} onClose       Function to toggle the menu
 * @param   {Function} removeFunction     Function to remove post
 * @param   {string} title     Post title
 * @param   {string} postId     Post id
 * @param   {string} communityName     Community Name
 * @returns {JSX.Element}            The rendered RemoveMenu component.
 *
 * @example
 * // Note: This component relies on its wrapper to set it to be visible
 * // Therefore, if you somehow set the menu to be visible but set the passed down functions as such
 * // You wont be able to exit the menu
 * const onClose = () => { console.log("Menu toggle attempt") };
 * const removeFunction = () => { console.log("Remove attempt") };
 * <RemoveMenu  onClose={onClose} removeFunction={changeTime} />
 */
function RemoveMenu({ sharing ,onClose, removeFunction, permissionFunction, changeFunction, fileId, name="", canDelete=true, canRename=true, isOwner=true}) {
  const maxChars = 20;
  const ogTitle = name;
  const [reason, setReason] = useState("None");
  const [title, setTitle] = useState(name);
  const [willDelete, setWillDelete] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [perm, setPerm] = useState(sharing);
  const [viewing, setViewing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (viewing === false) {
      setDeleting(false);
      setEditing(false);
      setRenaming(false);
    }
  }, [viewing]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      
      let currentPermissions= group.filter(permission => permission.username === username);
      if ( currentPermissions.length > 0 ) {
        console.log(currentPermissions);
        setDeleting(currentPermissions[0].canDelete);
        setEditing(currentPermissions[0].canEdit);
        setRenaming(currentPermissions[0].canRename);
        setViewing(currentPermissions[0].canView);
      }
      else
      {
        setViewing(false);
        setDeleting(false);
        setEditing(false);
        setRenaming(false);
      }
      setLoading(false);
  }, 1000);
  
  return () => clearTimeout(timeout);
  
  }, [username]);

  async function getPermissions() {
    const cookies = await getCookies();
    try {
      setLoading(true);
      const validate = await apiHandler(
        `/documents/get-permissions/${fileId}`,
        "GET",
        "",
        cookies.access_token
      );
      console.log(validate);
      //const files = await handler(`/get-files`, "GET", bodyData, token);//todo change api endpoint according to sortBy state
      setGroup(validate);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
  

  function handleDispInputChange(event) {
    const { value } = event.target;
    setTitle(value);
  }

  function handleUsernameInputChange(event) {
    const { value } = event.target;
    if (value.length <= maxChars) {
      setUsername(value);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    if (title.length === 0)
      return;

    if (isOwner && !perm && sharing) {
      // Prompt the user for confirmation
      const confirmed = window.confirm("You have turned off sharing options. Are you sure you want to save? This will remove permissions for every user.");
      if (!confirmed) {
        return; // User cancelled, do nothing
      }
    }

      changeFunction(fileId,title,perm);
      onClose();
  };

  const handleDelete = () => {
    removeFunction(fileId);
    onClose();
  };

  const handleUserSave = () => {
      const confirmed = window.confirm(`You are about to change permissions for ${username}. Are you sure?`);
      if (!confirmed) {
        return; // User cancelled, do nothing
      }
      permissionFunction(fileId,username,viewing, editing, renaming, deleting);
};

  //Prevent menu from being closed
  const handleClick = (event) => {
    event.stopPropagation();
  };

  const renderPermission = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection:"column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            width: "100%",
          }}
        >
          <Checkbox
            isChecked={perm}
            onToggle={() => {
              setPerm(!perm);
            }}
            label={"Enable Sharing Options"}
          />
          <p style={{fontSize:"12px", textAlign:"center"}}>
            Note: if you disable this option, the file will be visible to you only and all permissions set to all users will be reset
            and you will have to set each user again
            </p>
        </div>
        {perm && (
          <div className={styles.perm}>
            <div style={{ width: "100%"}}>
              <div style={{ display:"flex", flexDirection:"row",justifyContent:"center", alignItems:"center"}}>
              <DropdownMenu choose={setUsername} list={group.map(permission => permission.username)} />
            <TailSpin
            visible={loading}
            height="20"
            width="20"
            color="#3447c3"
            ariaLabel="tail-spin-loading"
            radius="0.5"
            wrapperStyle={{
              marginLeft:"12px"
            }}
            wrapperClass=""
          />
              </div>
            <div style={{ display:"flex", width: "100%", justifyContent: "center" }}>
              <input
                disabled={willDelete}
                placeholder="Username To Modify Permissions For"
                className={`${styles.txtBox} ${!willDelete ? "focusable" : ""}`}
                value={username}
                data-tribute="true"
                onKeyDown={handleKeyPress}
                onChange={handleUsernameInputChange}
                style={{ padding: "10px", justifySelf: "center", width:"60%", marginBottom:"-1em" }}
              />
            </div>
            </div>
            <div style={{ display:"flex", width: "100%", marginTop:"0",justifyContent: "center" }}>
              
              <OutlineButton
                isInverted={true}
                isFocusable={true}
                isDisabled={username.length==0}
                btnClick={handleUserSave}
              >
                <svg
                  style={{ marginRight: "1em" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z"
                  />
                </svg>
                Save
              </OutlineButton>
            </div>
            
            
            <Checkbox
              isChecked={viewing}
              onToggle={() => {
                setViewing(!viewing);
              }}
              label={"Enable Viewing"}
            />
            <Checkbox
              isChecked={editing && viewing}
              isDisabled={!viewing}
              onToggle={() => {
                setEditing(!editing);
              }}
              label={"Enable Editing"}
            />
            <Checkbox
              isChecked={renaming && viewing}
              isDisabled={!viewing}
              onToggle={() => {
                setRenaming(!renaming);
              }}
              label={"Enable Renaming"}
            />
            <Checkbox
              isChecked={deleting && viewing}
              isDisabled={!viewing}
              isDanger={true}
              onToggle={() => {
                setDeleting(!deleting);
              }}
              label={"Enable Deleting"}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            width: "100%",
          }}
        >
          <OutlineButton isFocusable={true} isInverted={true} btnClick={() => setDialog(!dialog)}>
            <svg
              style={{ marginRight: "1em" }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
              />
            </svg>
            Back to Main Settings
          </OutlineButton>
        </div>
      </>
    );
  };

  const renderMain = () => {
    return (
      <>
      <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px",
                  width: "100%",
                  cursor: `${willDelete || !canRename ? "not-allowed" : "inherit"}`
                }}
              >
                <p style={{ flex: "100%", color: `${willDelete ? "#EDEFF1" : "inherit"}` }}>Rename</p>
                <input
                  disabled={willDelete || !canRename}
                  placeholder="New File Name"
                  value={title}
                  className={`${styles.txtBox} ${!willDelete ? "focusable" : ""}`}
                  data-tribute="true"
                  onKeyDown={handleKeyPress}
                  onChange={handleDispInputChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:"center",
                  padding: "16px",
                  width: "100%",
                }}
              >
                <OutlineButton isFocusable={true} isInverted={true}
                btnClick={() => {setDialog(!dialog); getPermissions()}}
                isDisabled={willDelete || !isOwner}>
                  <svg
                  style={{marginRight:"1em"}}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="square"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Permission Settings
                </OutlineButton>
              </div>
                <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:"center",
                  padding: "16px",
                  width: "100%",
                }}
              >
                <Checkbox
                  isDanger={true}
                  isDisabled={!canDelete}
                  label={"Delete"}
                  isChecked={willDelete}
                  onToggle={() => {
                    setWillDelete(!willDelete);
                  }}
                />
              </div>
      </>
    );
  };


  return (
    <div className={`${styles.grayOut} `}>
      <div className={` ${styles.menuPosition}`}>
        <div
          aria-modal="true"
          className={styles.menuBox}
          role="dialog"
          tabIndex="-1"
          onClick={handleClick} // Prevent clicks from propagating to elements underneath the menu
        >
          <section className={styles.sectionSize}>
            <header className={styles.menuHeader}>
              <div className={styles.flexHeader}>
                <div className={styles.flexHeaderText}>
                  <div className={styles.textHeader}>Modify File <span style={{color:"#3447c3"}}>{ogTitle}</span> Settings</div>
                </div>
                <div
                  className={`${styles.flexX}`}
                  style={{ flexBasis: "16px" }}
                >
                  <button
                    className="focusable"
                    onClick={onClose}
                    style={{ backgroundColor: "transparent", border: "0px" }}
                  >
                    <div className={`${styles.colorX} ${styles.icon}`}>
                      &#10006;
                    </div>
                  </button>
                </div>
              </div>
            </header>
            <div className={`${styles.menuBody} ${styles.padding}`}>
              {dialog ? renderPermission() : renderMain()}
            </div>
          </section>
          <footer
            className={styles.footer}
            style={{ display: "flex", alignItems: "center" }}
          >
            {willDelete && (
              <p style={{ fontSize: "10px", color: "red", flex: "1" }}>
                Warning! The file will be deleted! This action cannot be undone.
              </p>
            )}
            <OutlineButton
              children={willDelete ? "Delete" : "Confirm"}
              isDisabled={!canDelete && !canRename && !isOwner || title.length === 0}
              isFocusable={true}
              btnClick={willDelete? handleDelete : handleSave}
              isInverted={!willDelete}
              isDanger={willDelete}
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default RemoveMenu;
