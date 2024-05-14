import java.util.*;

// Define a class to represent a document
class Document {
    String id;
    String content;
    int revision;
    List<Operation> changeBuffer;

    public Document(String id, String content) {
        this.id = id;
        this.content = content;
        this.revision = 0;
        this.changeBuffer = new ArrayList<>();
    }

    // Apply an operation to the document
    public void applyOperation(Operation op) {
        // Apply the operation to the document content
        this.content += op.change;
        // Update the revision number
        this.revision++;
        // Add the operation to the change buffer
        this.changeBuffer.add(op);
    }
}

// Define a class to represent an operation
class Operation {
    String change;
    int revision;

    public Operation(String change, int revision) {
        this.change = change;
        this.revision = revision;
    }
}

// Define a class to represent the server
class Server {
    Map<String, Document> documents; // Map to store documents by ID
    Map<String, Map<String, Integer>> userLatestRevision; // Map to store latest revisions per user per document

    public Server() {
        this.documents = new HashMap<>();
        this.userLatestRevision = new HashMap<>();
    }

    // Method to handle getting a document
    public Document getDocument(String docID) {
        if (documents.containsKey(docID)) {
            return documents.get(docID);
        } else {
            // For demonstration purposes, return a new empty document if not found
            return new Document(docID, "");
        }
    }

    // Method to handle getting updates for a document
    public List<Operation> getUpdates(String docID, int version) {
        Document doc = documents.get(docID);
        if (doc != null) {
            // Retrieve operations from the change buffer based on version
            List<Operation> updates = new ArrayList<>();
            for (int i = version; i < doc.changeBuffer.size(); i++) {
                updates.add(doc.changeBuffer.get(i));
            }
            return updates;
        }
        return new ArrayList<>();
    }

    // Method to process a message (operation) from a client
    public void processMessage(String docID, String userID, Operation op) {
        // Update userLatestRevision for the user
        if (!userLatestRevision.containsKey(docID)) {
            userLatestRevision.put(docID, new HashMap<>());
        }
        userLatestRevision.get(docID).put(userID, op.revision);
        
        Document doc = documents.get(docID);
        if (doc != null) {
            // Apply the operation to the document
            doc.applyOperation(op);
            // Broadcast the operation to other users editing the document
            // For demonstration purposes, print the operation
            System.out.println("Broadcast operation: " + op.change + " to users editing document " + docID);
        }
    }

    // Method to free memory and handle data races
    public void freeMemory() {
        // Iterate over userLatestRevision to find the minimum revision
        for (String docID : userLatestRevision.keySet()) {
            int minRevision = Integer.MAX_VALUE;
            for (int revision : userLatestRevision.get(docID).values()) {
                minRevision = Math.min(minRevision, revision);
            }
            // Remove old operations from the change buffers
            if (documents.containsKey(docID)) {
                Document doc = documents.get(docID);
                List<Operation> newChangeBuffer = new ArrayList<>();
                for (Operation op : doc.changeBuffer) {
                    if (op.revision >= minRevision) {
                        newChangeBuffer.add(op);
                    }
                }
                doc.changeBuffer = newChangeBuffer;
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        // Create a server instance
        Server server = new Server();

        // Example usage
        String docID = "document1";
        String userID = "user1";
        Operation op1 = new Operation("Insert A", 1);
        Operation op2 = new Operation("Insert B", 2);

        // Process operations from clients
        server.processMessage(docID, userID, op1);
        server.processMessage(docID, userID, op2);

        // Get updates for a document
        List<Operation> updates = server.getUpdates(docID, 0);
        for (Operation update : updates) {
            System.out.println("Update received: " + update.change);
        }

        // Free memory
        server.freeMemory();
    }
}
