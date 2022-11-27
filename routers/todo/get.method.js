(() => {

    const mongodb = require('../../databases/mongo-db');

    module.exports = async (req, res, next) => {
        try {
            
            const collection = await mongodb(
                process.env.DATABASE_HOST,
                process.env.DATABASE_NAME,
                process.env.DATABASE_COLLLECTION,
            );
            
            const response = await collection.find().toArray();
            
            return res.status(200).json({ response: response });

        } catch (error) {
            throw error;
        }
    }
})();