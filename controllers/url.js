const shortid = require('shortid');
const URL = require('../models/mongo');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({error: 'Invalid'})
    const shortID = shortid()
    
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.json({ id: shortID })
} 

async function handleGetAnalytics(req, res) {
    const shortid = req.params.shortid
    const result = await URL.findone({ shortId })
    return res.json ({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}