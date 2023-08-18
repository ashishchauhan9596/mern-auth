import express from "express";
import createError from "http-errors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/', (req, res, next) => {
    next(createError.NotFound());
})

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})