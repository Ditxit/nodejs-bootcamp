(() => {

    const mongodb = require('../../databases/mongo-db');

    const { ObjectId } = require("mongodb");

    module.exports = async (req, res, next) => {
        try {

            const collection = await mongodb(
                process.env.DATABASE_HOST,
                process.env.DATABASE_NAME,
                process.env.DATABASE_COLLLECTION,
            );

            const id = req.body.id;
            const task = req.body.task;

            const condition = {
                "_id": ObjectId(id)
            }

            const changes = {
                $set: {
                    task: task
                }
            }

            const response = await collection.updateOne(condition, changes);

            return res.status(200).json({ response: response });

        } catch (error) {
            throw error;
        }
    }
})();