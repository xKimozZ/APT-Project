"use client";
import React, {useState, useEffect, useMemo} from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"
import kitteh from "@/app/assets/kitteh.png"
import OutlineButton from "@/app/components/UI/OutlineButton";
import DocumentIcon from "@/app/components/UI/DocumentIcon";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler.js"
import { TailSpin } from "react-loader-spinner";
import WrapperNew from "@/app/components/UI/WrapperNew";
import RichTextEditor from "@/app/components/UI/RichTextEditor";

function Editor({params : {fileId}}) {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("tester");
    const [newMenuOn, setNewMenuOn] = useState(false);
    const [displayOthers, setDisplayOthers] = useState(true);
    const [filesArray, setFilesArray] = useState([
    ]);

    useEffect(() => {
      async function cookiesfn() {
        const cookies = await getCookies();
        console.log(cookies);
        try {
          if (cookies !== null && cookies.access_token && cookies.username) {
            const validate = await apiHandler(`/validate-token`, "GET", "", cookies.access_token);
            //console.log(validate);
            setToken(cookies.access_token);
            setUsername(cookies.username);
            setLoading(false);
          } else {
            router.push("/login");
          }
        } catch(error) {
          console.log(error);
          handleLogout();
        }
      }
      
      const delay = setTimeout(() => {
        cookiesfn();
      }, 0);
  
      return () => clearTimeout(delay);
    }, []);

    async function getFiles() {
        let bodyData = {
            username: username,
          };
      try {
    
        const files = await handler(`/get-files`, "GET", bodyData, token);//todo change api endpoint according to sortBy state
        setFilesArray(files);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    }

    async function deleteFile(fileId) {
        let bodyData = {
          username: username,
          id: fileId,
        };
        console.log(bodyData);
    
        try {
          const sent = await handler(
            `/delete-file`,
            "POST",
            bodyData,
            token
          );
          console.log(sent);
          getFiles();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      async function changePermission(fileId, name, canView, canEdit, canRename, canDelete) {
        let bodyData = {
          name: name,
          id: fileId,
          canView: canView,
          canEdit: canEdit,
          canRename: canRename,
          canDelete: canDelete,
        };
        getFiles();
        console.log(bodyData);
    
        try {
          const sent = await handler(
            `/change-permissions`,
            "POST",
            bodyData,
            token
          );
          console.log(sent);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      useEffect(()=> {
        getFiles();
      },[token]);

      async function confirmFileChanges(fileId, title, sharingOptionsOn) {
        let bodyData = {
          username:username,
          title: title,
          id: fileId,
          sharingOptions: sharingOptionsOn,
        };
        console.log(bodyData);
    
        try {
          const sent = await handler(
            `/file-change`,
            "POST",
            bodyData,
            token
          );
          console.log(sent);
          getFiles();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      async function newFile(title) {
        let bodyData = {
          username: username,
          title: title,
        };
        console.log(bodyData);
    
        try {
          const sent = await handler(
            `/new-file`,
            "POST",
            bodyData,
            token
          );
          console.log(sent);
          getFiles();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const filteredFiles = useMemo(() => {
        if (displayOthers) {
          return filesArray;
        } else {
          return filesArray.filter(file => file.owner === username);
        }
      }, [displayOthers, filesArray, username]);

  return (
    <>
    {loading ? <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",
    justifyContent:"center", gap:"2em",margin:"0 auto",  position:"absolute",top:"35%"}}>
      <TailSpin
      visible={true}
      height="160"
      width="160"
      color="#3447c3"
      ariaLabel="tail-spin-loading"
      radius="0.5"
      wrapperStyle={{display:"flex",width:"100%",alignItems:"center", justifyContent:"center",}}
      wrapperClass=""
      /></div> :
    <div className={`${styles.allPadding} ${styles.container}`}>
      <div className={styles.header}>
        <div className={styles.toolbar}>
          <div style={{display:"flex", gap:"1em", alignItems:"center" }}>
            <OutlineButton isInverted={true} btnClick={() => router.push("/home")}>
            <svg
              style={{ marginRight:"1em"}}
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
                d="m15 19-7-7 7-7"
              />
            </svg>
            Back
          </OutlineButton>
          <OutlineButton isInverted={true} btnClick={() => setNewMenuOn(true)}>
            <svg
              style={{ marginRight: "1em" }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z"
                clip-rule="evenodd"
              />
            </svg>
            New Document
          </OutlineButton>
          Editing as {username}
          </div>
          
          <WrapperNew
            onClose={() => setNewMenuOn(false)}
            isOpen={newMenuOn}
            newFunction={newFile}
          />
          <div style={{ marginRight: "1em" }}>
            Currently editing file ID: <strong>{fileId}</strong>
          </div>
        </div>
      </div>
      <div className={styles.fileContainer}>
        {true ? (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <RichTextEditor setContent={() => {}} setRawContent={() => {}} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "5em auto",
            }}
          >
            <div
              className={styles.kitteh}
              style={{ backgroundImage: `url(${kitteh.src})` }}
            ></div>
            <span style={{ textAlign: "center", width: "100%" }}>
              File ID {fileId} doesn't exist!
            </span>
          </div>
        )}
      </div>
    </div>}
    </>
  );
}

export default Editor;
