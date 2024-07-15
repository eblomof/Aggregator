import express from "express";
import bodyParser from "body-parser";
import userRoutes from "../interfaces/routes/userRoutes";

const app = express();

// Middleware to parse JSON bodies
app.use((req, res, next) => {
    console.log("Incoming request body:", req.body);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoutes);

export default app;
