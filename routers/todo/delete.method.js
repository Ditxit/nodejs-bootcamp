(() => {

    const mongodb = require('../../databases/mongo-db');

    const { ObjectId } = require("mongodb");

    const helperFunction = {
        isNonEmptyString: (string) => {
            try {
                string = string.trim();
                if (string.length < 1) return false;
                return true;
            } catch {
                return false;
            }
        }
    }

    module.exports = async (req, res, next) => {
        try {

            const isNonEmptyString = helperFunction.isNonEmptyString(req.query.id);

            if (!req.query.id) {
                return res.status(403).json({ message: "Id is required" });
            }

            if (!isNonEmptyString) {
                return res.status(403).json({ message: "The string is empty" });
            }

            const collection = await mongodb(
                process.env.DATABASE_HOST,
                process.env.DATABASE_NAME,
                process.env.DATABASE_COLLLECTION,
            );

            const id = req.query.id;

            const condition = {
                "_id": ObjectId(id),
            }

            const response = await collection.deleteOne(condition);

            return res.status(200).json({ response: response });

        } catch (error) {
            // throw error;
            return res.status(500).json({ message: error.message });
        }
    }
})();