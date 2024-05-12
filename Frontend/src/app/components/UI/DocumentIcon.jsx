import React from "react";
import Image from "next/image";
import binp from"../../assets/binimage.png"
import { useState,useEffect } from 'react';
import styles from "./DocumentIcon.module.css";
import apiHandler from "../../utils/apiHandler";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import Wrapper from "./Wrapper";

function DocumentIcon({
  name = "TestFile",
  fileId = 69,
  owner = "owner",
  username = "me",
  sharing = true,
  removeFunction,
  permissionFunction,
  changeFunction,
  group = [{
    username: "user1",
    editing: true,
    renaming: true,
    deleting: true,
  }],
}) {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canRename, setCanRename] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (username === owner) {
      setCanDelete(true);
      setIsOwner(true);
      setCanEdit(true);
      setCanRename(true);
    } else {
      const userPermissions = group.find(
        (member) => member.username === username
      );
      if (userPermissions) {
        setCanDelete(userPermissions.deleting || false);
        setCanRename(userPermissions.renaming || false);
        setCanEdit(userPermissions.editing || false);
      } else {
        setCanDelete(false);
        setCanRename(false);
        setCanEdit(false);
      }
    }
  }, [username]);

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      setMenuVisible(true);
    }
  }

  const renderIcon = (letter) => {
    let color;
    switch (letter) {
      case "R":
        color = "rgb(0, 170, 96)";
        break;
      case "E":
        color = "rgb(0, 94, 255)";
        break;
      case "D":
        color = "rgb(255, 0, 0)";
        break;
      case "O":
        color = "rgb(170, 0, 255)";
        break;
      default:
        break;
    }
    return (
      <span style={{backgroundColor: `${color}`}} className={styles.permIcon}>
        {letter}
      </span>
    );
  };

  return (
    <div style={{outline:"none"}} className={!menuVisible && styles.hov} tabIndex={0} onKeyDown={(event) => {
      handleKeyDown(event);
    }}>
<div
      className={styles.iconPos}
      onClick={() => !menuVisible && router.push(`/file/${fileId}`)}
      
    >
      <div style={{ position: "absolute", left: "3%", top: "-2px" }}>
        {isOwner ? (
          renderIcon("O")
        ) : (
          <>
          {canEdit && renderIcon("E")}
            {canRename && renderIcon("R")}
            {canDelete && renderIcon("D")}
          </>
        )}
      </div>
      <svg
        className={styles.icon}
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
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"
        />
      </svg>
      <a
        href={`file/${fileId}`}
        tabIndex={-1}
        className={styles.fileName}
        onClick={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          handleKeyDown(event);
        }}
      >
        {name}
      </a>
      <p className={styles.ownerText}>
        By <strong>{owner}</strong>
      </p>
      <div className={styles.moreIconPos}>
        <Wrapper
          isOpen={menuVisible}
          fileId={fileId}
          canDelete={canDelete}
          canRename={canRename}
          isOwner={isOwner}
          removeFunction={removeFunction}
          permissionFunction={permissionFunction}
          changeFunction={changeFunction}
          sharing={sharing}
          onClose={() => setMenuVisible(false)}
          title={name}
        />
        <button
        tabIndex={-1}
          type="button"
          className={styles.btn}
          onClick={(event) => {
            event.stopPropagation();
            setMenuVisible(true);
          }}
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
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
              d="M6 12h.01m6 0h.01m5.99 0h.01"
            />
          </svg>
        </button>
      </div>
    </div>
    </div>
    
  );
}
  export default DocumentIcon;
