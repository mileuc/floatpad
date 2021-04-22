require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
// const connection = mongoose.connection;
// connection.once("open", function() {
//     console.log("MongoDB database connection established successfully!");
// });
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!!!!");
});

const notesRouter = require("./routes/notes");

app.use("/notes", notesRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}
else {
    app.get('/', (req, res) => {
        res.send("Api running");
    }); 
}

app.listen(port, function(){
    console.log(`Server started on port ${port}.`);
})