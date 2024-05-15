You need NodeJS with Next installed to be able to run the frontend and realtime server
Preferably run the Java backend with IntelliJ

To run frontend:
1 - navigate to /Frontend/
2 - in configuration.js, set your LOCAL IP address
3 - npm install
4 - npm install react-loader-spinner
5 - npm run dev

(If any module appears missing, use npm install `module-name`)
(if npm produces a .ps1 error, try running using a Powershell terminal
from inside the directory, if still troublesome, try running it as admin)

To run backend:
1 - ensure port 8081 is unused
2 - run with IntelliJ, if mongoDB connection error comes up, please contact me
at karim.hasseb02@eng-st.cu.edu.eg so that I can add your IP address to the whitelist

To run realtime server:
1 - navigate to /Frontend/
2 - ensure port 8082 is unused
3 - node server.js