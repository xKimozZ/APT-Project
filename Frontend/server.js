const mongoose = require("mongoose")
const Document = require("./Document")

mongoose.connect("mongodb+srv://root:root@cluster0.p8b99ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
  //useCreateIndex: true,
})



const io = require("socket.io")(8082, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
  
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      //console.log(`Sent + ${delta}`);
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
    let intervalId;
    intervalId = setInterval(async () => {
      await Document.findByIdAndUpdate(documentId, {
        $push: { versions: { data: document.data } }
      });
    }, 20000);
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}


//////////////////////////////////////////////////////////////////////////

// server.js
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const mongoose = require("mongoose");

// // MongoDB connection
// mongoose.connect("mongodb://localhost:27017/collaborative_editor", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define Document model
// const Document = mongoose.model("Document", {
//   _id: String,
//   data: String,
//   versions: [{ data: String }],
// });

// // Express setup
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Socket.IO setup
// io.on("connection", (socket) => {
//   socket.on("get-document", async (documentId) => {
//     const document = await findOrCreateDocument(documentId);
//     socket.join(documentId);
//     socket.emit("load-document", document.data);

//     socket.on("send-changes", async (delta) => {
//       const document = await Document.findById(documentId);
//       const resolvedDocument = resolveConflicts(document.data, document.versions);
//       document.data = applyOperation(resolvedDocument, delta);
//       await document.save();
//       socket.broadcast.to(documentId).emit("receive-changes", delta);
//     });

//     socket.on("disconnect", () => {
//       socket.leave(documentId);
//     });
//   });
// });

// // Find or create document
// async function findOrCreateDocument(id) {
//   let document = await Document.findById(id);
//   if (!document) {
//     document = await Document.create({ _id: id, data: "" });
//   }
//   return document;
// }

// // Apply operation to document using OT
// function applyOperation(documentData, delta) {
//   // Apply delta to the document (simple example)
//   // Implement your OT logic here if needed
//   // For simplicity, this example just applies delta directly
//   return delta;
// }

// // Resolve conflicts using merging (example)
// function resolveConflicts(currentDocument, versions) {
//   // Merge changes from versions into the current document
//   // Implement your conflict resolution logic here
//   // Ensure that the resolution process maintains document integrity
//   return currentDocument;
// }

// // Start server
// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
