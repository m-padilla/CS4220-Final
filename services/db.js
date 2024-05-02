import {MongoClient} from 'mongodb';

/**
 * Class representing a MongoDB database connection and interactions
 */
class MongoDB {
   
    /**
     * constructor
     */
    constructor(dbUser, dbPassword, dbHost, dbName){
        // Constructs the Mongo URL
        const mongoURL = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`; 
        
        // Defined variables for the MongoDB client and database.
        this.client = new MongoClient(mongoURL);
        this.db = this.client.db();
    }

    /**
     * Opens a connection to the MongoDB database
     */
   
    async connect(){
        try{
            await this.client.connect();
            console.log('\nConnected to MongoDB');
        }
        catch (err){
            console.error(err);
        }
    }

    /**
     * Closes the connection to the MongoDB database.
     */
    async close(){
        try{
            await this.client.close();

            console.log('Disconnected from MongoDB\n');
        }
        catch (err){
            console.error(err);
        }
    }

    /**
     * Creates a new document in the specified collection
     * @param {string} collectionName - the name of the collection
     * @param {Object} data - the data to be inserted into the collection
     * @returns {Promise<Object>} - a Promise that resolves with the acknoledgement document
     */

    async create (collectionName, data){
        try{
            const collection = this.db.collection(collectionName);
            const doc = await collection.insertOne(data);
            return doc;
        }
        catch (err){
            console.error(err);
        }
    }
    
    /**
     * Finds documents by their _id in the specified collection
     * @param {string} collectionName - the name of the collection
     * @param {string} _id - the _id of the document to find
     * @returns {Promise<Cursor>} - a Promise that resolves with the cursor
     */

    async find (collectionName, mealId){
        try{
            const collection = this.db.collection(collectionName);
           
            if(villain_id){
                console.log('FOUND:');
                const cursor = await collection.find({ mealId });
                return await cursor.next();
            }
            else{
                console.log('NOT FOUND:');
                const cursor = await collection.find({});
                return await cursor.next();
            }
        }
        catch (err){
            console.error(err);
        }
    }

    /**
     * Update documents by their _id in the specified collection
     * @param {string} collectionName - the name of the collection
     * @param {string} _id - the _id of the document to find
     * @param {string} data - data to update the document
     */

    async update (collectionName, mealId, data){
        try{
            const collection = this.db.collection(collectionName);
            await collection.updateOne(
                { mealId: mealId },
                { $set: data }
            );
        }
        catch (err){
            console.error(err);
        }
    }


}

export default MongoDB;