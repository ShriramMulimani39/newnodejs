
const express = require("express");
const app = express();

//middleware
app.use(express.json());

app.listen(3001, () => {
    console.log("Server is running on post 3001");
});

module.exports = app;

const mongoose = require("mongoose");

//configure mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1/test",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Connected to MongoDB");
        }
    }
);

const blogRouter = require("./routes/BlogRoutes");

app.use("/api/blogs", blogRouter);  