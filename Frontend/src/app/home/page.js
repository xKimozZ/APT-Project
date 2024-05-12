"use client";
import React, {useState, useEffect, useMemo} from "react";
import apiHandler from "@/app/utils/apiHandler.js"
import { useRouter } from "next/navigation";
import styles from"./page.module.css"
import deleteCookies from "@/app/utils/deleteCookies";
import getCookies from "@/app/utils/getCookies";
import OutlineButton from "../components/UI/OutlineButton";
import DocumentIcon from "../components/UI/DocumentIcon";
import WrapperNew from "../components/UI/WrapperNew";
import { TailSpin } from "react-loader-spinner";

function FileExplorer() {
  const router = useRouter();
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("tester");
    const [loading, setLoading] = useState(true);
    const [newMenuOn, setNewMenuOn] = useState(false);
    const [displayOthers, setDisplayOthers] = useState(true);
    const [filesArray, setFilesArray] = useState([
      {
        name: "ILOVEYOU.TXT",
        id: 12,
        sharing: true,
        owner: "tester",
        group: [
          {
            username: "user1",
            editing: true,
            deleting: false,
            renaming: true,
          },
          {
            username: "user2",
            editing: true,
            deleting: true,
            renaming: false,
          },
        ],
      },
      {
        name: "ILOVEYOU.TXT",
        id: 12,
        sharing: true,
        owner: "tester1",
        group: [
          {
            username: "tester",
            editing: true,
            deleting: true,
            renaming: true,
          },
          {
            username: "user2",
            editing: true,
            deleting: true,
            renaming: false,
          },
        ],
      },
      {
        name: "Document1.txt",
        id: 1,
        sharing: true,
        owner: "tester1",
        group: [
          {
            username: "user1",
            editing: true,
            deleting: false,
            renaming: true,
          },
          {
            username: "user2",
            editing: true,
            deleting: true,
            renaming: false,
          },
        ],
      },
      {
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },{
        name: "Document2.txt",
        id: 2,
        sharing: true,
        owner: "tester2",
        group: [
          {
            username: "user1",
            editing: false,
            deleting: true,
            renaming: true,
          },
          {
            username: "user3",
            editing: true,
            deleting: true,
            renaming: true,
          },
        ],
      },
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
    
        //const files = await handler(`/get-files`, "GET", bodyData, token);//todo change api endpoint according to sortBy state
        //setFilesArray(files);
      
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

      const handleLogout = async () => {
        setLoading(true);
        await deleteCookies();
        router.push("/login")
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
          <div style={{ display: "flex", gap: "1em", alignItems:"center" }}>
            <OutlineButton
              isDanger={true}
              btnClick={handleLogout}
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
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
              Sign Out
            </OutlineButton>
            <OutlineButton
              isInverted={true}
              btnClick={() => setNewMenuOn(true)}
            >
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
             Signed in as {username}
          </div>
          <WrapperNew
            onClose={() => setNewMenuOn(false)}
            isOpen={newMenuOn}
            newFunction={newFile}
          />
          <div>
            {displayOthers ? (
              <OutlineButton
                btnClick={() => {
                  setDisplayOthers(!displayOthers);
                }}
              >
                <svg
                  style={{ marginRight: "6px" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Show Mine
              </OutlineButton>
            ) : (
              <OutlineButton
                btnClick={() => {
                  setDisplayOthers(!displayOthers);
                }}
              >
                <svg
                  style={{ marginRight: "6px" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Show All
              </OutlineButton>
            )}
          </div>
        </div>
      </div>
      <div className={styles.fileContainer} style={{paddingLeft:"1.7em"}}>
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, index) => (
            <DocumentIcon
              key={index}
              username={username}
              removeFunction={deleteFile}
              changeFunction={confirmFileChanges}
              permissionFunction={changePermission}
              name={file.name}
              owner={file.owner}
              group={file.group}
              fileId={file.id}
              sharing={file.sharing}
            />
          ))
        ) : (
          <span
            style={{ textAlign: "center", margin: "5em auto", width: "100%" }}
          >
            No files found
          </span>
        )}
      </div>
    </div>}</>
  );
}

export default FileExplorer;
