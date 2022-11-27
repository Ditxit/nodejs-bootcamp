(() => {

    const mongodb = require('../../databases/mongo-db');

    module.exports = async (req, res, next) => {
        try {
            
            const collection = await mongodb(
                process.env.DATABASE_HOST,
                process.env.DATABASE_NAME,
                process.env.DATABASE_COLLLECTION,
            );
            
            const response = await collection.insertOne({
                task: req.body.task,
                isCompleted: false
            });
            
            return res.status(200).json({ response: response });

        } catch (error) {
            throw error;
        }
    }
})();