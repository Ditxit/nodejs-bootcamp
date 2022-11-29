try {
    /* set the correct environment variables */
    const dotenv = require('dotenv');
    dotenv.config({ path: 'environments/local.env' });

    /* initialize or create an express application */
    const express = require('express');
    const app = express();

    /* use json middleware to access body of request */
    app.use(express.json());

    /* add all the middlewares here; one followed by another */
    app.use((req, res, next) => {
        console.log(`${Date()} :: ${req.method} request at ${req.originalUrl} endpoint from IP ${req.ip}`);
        return next();
    });

    // auth middleware
    app.use((req, res, next) => {
        // console.table(req.headers);

        // if (!req.headers.authorization) {
        //     return res.status(401).json({ message: "The authorization token was not passed" });
        // }

        // if (req.headers.authorization !== 'manish') {
        //     return res.status(401).json({ message: "The authorization token invalid" });
        // }

        return next();
    });

    const routers = require('./routers');
    app.use('/', routers);

    /* api endpoint to check server status */
    app.use('/health-check', (req, res, next) => {
        return res.status(200).json({ message: "Server is running." });
    });

    /* fallback api endpoint handler */
    app.use('/*', (req, res, next) => {
        return res.status(404).json({ message: "API not found." });
    });

    /* finally start listerning to requests in a port */
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`${Date()} :: Express server started listerning at ${PORT} port`);
    });

} catch (error) {
    console.warn(error.message);
}