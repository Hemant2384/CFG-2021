const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
// const passport = require("passport");
const users = require("./routes/user");
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo DB database established successfully");
})

// Passport middleware
// app.use(passport.initialize());

// // Passport config
// require("./config/passport")(passport);

// // Routes
app.use("/users", users);

const port = process.env.PORT || 4000;

const SchoolRouter = require('./routes/school');
const ForumRouter=require('./routes/forum')

app.use('/school', SchoolRouter);
app.use('/forum',ForumRouter);
const VolunteerRouter = require('./routes/volunteer');
const PortalRouter = require('./routes/portal');


app.use('/school', SchoolRouter);
app.use('/volunteer', VolunteerRouter);
app.use('/portal', PortalRouter);


app.listen(port, () => {
    console.log(`Server running on port port ${port}`);
});
