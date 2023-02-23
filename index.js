const express = require('express');
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/short_id')
const URL = require('./models/mongo')

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1/URL_Shortner").then(() =>
console.log("Mongodb Connected"))

app.use(express.json());

app.use("/url", urlRoute)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory : {
                    timestamp: Date.now(),
                },
            },
        }
    )
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));