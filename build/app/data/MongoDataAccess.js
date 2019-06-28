"use strict";
// import mongoose from 'mongoose';
const Mongoose = require("mongoose");
const config = module.require('../../config/keys');
class MongodataAccess {
    constructor() {
        MongodataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once('open', () => {
            console.log('Connected to mongodb');
        });
        const params = {
            uri: `${config.DATABASE_HOST}/${config.DATABASE_NAME}`
        };
        this.mongooseInstance = Mongoose.connect(params.uri, {
            useNewUrlParser: true
        });
        return this.mongooseInstance;
    }
    static disconnect() {
        this.mongooseConnection.close();
    }
}
MongodataAccess.connect();
module.exports = MongodataAccess;
