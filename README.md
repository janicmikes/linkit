# linkit
WED LinkIT Project

This project is based on node.js and the express framework.

Build Resource:
http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/

# Launching
1. Start DB
```
mongod --dbpath ./data
```
2. Start Node.js Server
```
nodemon ./bin/www
```

(nodemon) listens to changed files and restarts automatically.
Alternative start, which then requires manual restart would be ```npm start```

Stoping the server with ```cmd + c```