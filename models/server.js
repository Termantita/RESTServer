const express = require('express');
const cors = require('cors');
const { connectDB } = require('../db/config');
class Server {
  constructor() {
    // Express App
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';
    
    // Connect to database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // App Routes
    this.routes();
  }

  async connectDB() {
    await connectDB();
  }

  middlewares() {
    // Public Directory
    this.app.use(express.static('public'));
    
    //CORS
    this.app.use(cors());

    // Read and parse of the body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'))
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Listening on port ' + this.port)
    })
  }
}

module.exports = Server;