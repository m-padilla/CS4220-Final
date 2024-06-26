import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';

/**
 * ES6 module for interacting with MongoDB
 * @returns {Object} - Object containing functions to interact with MongoDB
 */
const mongo = () => {
    // Load the environment variables from the .env file
    dotenv.config();

    const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
    const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

    let client;
    let db;

    /**
     * @description Attempts to open a connection to the MongoDB database.
     */
    async function connect() {
        try {
            client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();
           
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error( err );
        }
    }

    /**
     * Closes the connection to the MongoDB database
     * @description Attempts to open a connection to the MongoDB database.
     */
    async function close() {
        try {
            await client.close();

            console.log('Closed connection to MongoDB');
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Creates a new document in the specified collection
     * @param {string} collectionName - name of the collection
     * @param {Object} data - data to be inserted into the collection
     */
    async function create(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Finds documents in the specified collection
     * @param {string} collectionName - name of the collection
     * @param {string} deckIdentifier - identifier for filtering documents
     * @returns {Cursor} - a MongoDB Cursor object
     */

    async function find(collectionName, keyword) {
        try {
            const collection = db.collection(collectionName);

            if (keyword) {
                const cursor = await collection.find({
                    searchTerm: keyword
                });
                return cursor;
            } else {
                const cursor = await collection.find({});
                return cursor;
            }
        }
        catch(err){
            console.error( err );
        }
    }

    /**
     * Updates documents in the specified collection
     * @param {string} collectionName - name of the collection
     * @param {string} deckIdentifier - identifier for filtering documents
     * @param {Object} data - the data to be updated
     */
    async function update(collectionName, keyword, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.updateOne(
                { searchTerm: keyword },
                { $set: data }
            );
        } catch (err) {
            console.error(err);
        }
    }
    
    return {
        connect,
        close,
        create,
        find,
        update
    };
};

export default mongo();