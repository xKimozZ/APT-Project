import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import configuration from "@/app/configuration"

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  ["bold", "italic"],
];

export default function TextEditor({ documentId = -1, readOnly = false , setVersions=()=>{}, versionState=null}) {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    // Use your hosting device IP from network settings
    const s = io(`http://${configuration.localhost}:8082`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      if (!readOnly) {
        quill.enable();
      }
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId, readOnly]);

  useEffect(() => {
    if (socket == null || quill == null || readOnly) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, readOnly]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null || readOnly) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      
      console.log(delta);
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill, readOnly]);

  useEffect(() => {
    if (socket == null) return;

    // Listen for version history from the server
    socket.on("version-history", (versions) => {
      console.log("Received version history:", versions);
      // Handle version history received from the server
      setVersions(versions);
    });

    return () => {
      socket.off("version-history");
    };
  }, [socket]);

  useEffect(() => {
    if (socket == null || versionState == null) return;

    // Send a save-document event when versionState changes
    socket.emit("save-document", versionState);
    quill.setContents(versionState);

  }, [socket, versionState]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    if (readOnly) {
      q.disable();
    } else {
      q.setText("Loading...");
    }
    setQuill(q);
  }, [readOnly]);

  return <div className="container" ref={wrapperRef}></div>;
}