const express = require('express');
const ecgRoute = require('./routes/api/ecg');

const app = express()


const {mongoose} = require("./config/mongoose");
app.use(express.json());

app.use('/api', ecgRoute);

app.get("*", (req, res) => {
        res.status(404);
        res.send()
    }
)

app.listen(5000, "localhost", () => console.log(`Server running on port ${process.env.PORT}`));