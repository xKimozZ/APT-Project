"use client";
import React, {useState, useEffect, useMemo} from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"
import kitteh from "@/app/assets/kitteh.png"
import OutlineButton from "@/app/components/UI/OutlineButton";
import DocumentIcon from "@/app/components/UI/DocumentIcon";
import deleteCookies from "@/app/utils/deleteCookies";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler.js"
import { TailSpin } from "react-loader-spinner";
import WrapperNew from "@/app/components/UI/WrapperNew";
import RichTextEditor from "@/app/components/UI/RichTextEditor";
import TextEditor from "@/app/components/UI/TextEditor";

function Editor({params : {fileId}}) {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("tester");
    const [newMenuOn, setNewMenuOn] = useState(false);
    const [editing, setEditing] = useState(false);
    const [viewing, setViewing] = useState(false);
    const [file, setFile] = useState(null);

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
            //setLoading(false);
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

    const handleLogout = async () => {
      setLoading(true);
      await deleteCookies();
      router.push("/login")
    }

    async function getCurrentFile() {
      try {
    
        const file = await apiHandler(`/documents/${fileId}`, "GET", "", token);
        setFile(file);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    }

    useEffect(() => {
      getCurrentFile();
    }, [token]);

    useEffect(() => {
      setLoading(true);
      const timeout = setTimeout(() => {
        if (!file)
          {
            setLoading(false);
            return;
          }
        let currentPermissions= file.groupPermissions.filter(permission => permission.username === username);
        if ( currentPermissions.length > 0 ) {
          setEditing(currentPermissions[0].canEdit);
          setViewing(currentPermissions[0].canView);
        }
        else
        {
          setEditing(false);
          setViewing(false);
        }
        if (file.publicViewingOn)
          setViewing(true);
        if (file.owner === username)
          {
            setEditing(true);
            setViewing(true);
          }
        setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
    
    }, [file]);

      async function newFile(title) {
        let bodyData = {
          username: username,
          title: title,
        };
        console.log(bodyData);
    
        try {
          if (!await validateSession())
            return;
          const sent = await apiHandler(`/documents`, "POST", bodyData, token);
          window.alert("File created");
          console.log(sent);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

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
          {editing ? "Editing" : "Viewing"} as <strong>{username}</strong>
          </div>
          
          <WrapperNew
            onClose={() => setNewMenuOn(false)}
            isOpen={newMenuOn}
            newFunction={newFile}
          />
          <div style={{ marginRight: "1em", fontSize:"0.9em" }}>
            Currently {editing ? "editing" : "viewing"} file ID: <strong>{fileId}</strong><br/>
            Title: <strong>{file && file.title}</strong>
            <br/>
            Owner: <strong>{file && file.owner}</strong>
          </div>
        </div>
      </div>
      <div className={styles.fileContainer}>
        {file && viewing ? (
          <>
          <div style={{ minHeight: "16px"}}></div>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            {/*<RichTextEditor setContent={() => {}} setRawContent={() => {}} />*/}
            
            <TextEditor documentId={fileId} readOnly={!editing}/>
          </div></>
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
              style={{ backgroundImage: `url(${kitteh.src})`, width:"100%"}}
            ></div>
            { !file ? <span style={{ textAlign: "center", width: "100%" }}>
              File ID {fileId} doesn't exist!
            </span> : <span style={{ textAlign: "center", width: "100%" }}>
              You don't have access to this file.
            </span>}
          </div>
        )}
      </div>
    </div>}
    </>
  );
}

export default Editor;
