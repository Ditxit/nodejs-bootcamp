(() => {
    module.exports = async (req, res, next) => {
        try {
            
            const message = `${Date()} :: Received ${req.method} request at ${req.originalUrl} endpoint from IP ${req.ip}`;
            return res.status(200).json({ message: message });

        } catch (error) {
            throw error;
        }
    }
})();