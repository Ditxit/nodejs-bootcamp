(() => {

    const { MongoClient } = require("mongodb");

    module.exports = async (host, database, collection) => {
        try {
            
            // we create client
            const client = new MongoClient(host);

            // creating connextion
            const connection = await client.connect();

            const target_database = connection.db(database);

            const target_collection = target_database.collection(collection);

            return target_collection;

        } catch (error) {
            throw error;
        }
    }
})();