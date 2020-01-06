const express = require("express");
const bodyParser = require("body-parser");
const expressGraphql = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');


// initial app
const app = express();

// MIDDLEWARES
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// graphql middleware
app.use('/graphql', expressGraphql({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

// CONFIGS
// mongoDB;
const db = require("./config/env").mongoURI;

// CONNECT TO DB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("we are connected to our DB"))
    .catch(err => console.log(err));

// SET PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
    // test
    console.log(`We're live at ${port}`);
});