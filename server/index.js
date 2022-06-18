const express = require("express");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const app = express();

// connect to database
connectDB();

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === "development",
    })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
    let url = path.join(__dirname, "public", "index.html");
    if(!url.startsWith('/graphql/')) {
        url = url.substring(1);
    }
    res.sendFile(url);
});

app.listen(port, console.log("Server running on PORT:", port));
