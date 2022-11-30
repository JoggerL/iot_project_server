const express = require('express');
const router = express.Router();
const {Record} = require('../../models/Record');
const {mongoChecker, isMongoError} = require("../../helpers/mongo_helpers");

router.get('/record/by_ts/:ts', mongoChecker, async (req, res) => {
    try {
        const ts = +req.params.ts
        const ecg = await Record.findOne({'ts': ts}, "data")
        if (!ecg) {
            res.status(404).send()
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(ecg))
        }
    } catch (error) {
        console.log(error)
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request')
        }
    }
})

// router.get('/record/by_ts/:ts-:tse', mongoChecker, async (req, res) => {
//     try {
//         const ts = +req.params.ts
//         const tse = +req.params.ts
//         // const ecg = await Record.findOne({'ts': ts}, "data")
//         const ecg = await Record.find({'ts': {$gte: ts}},"data")
//         if (!ecg) {
//             res.status(404).send()
//         } else {
//             res.setHeader('Content-Type', 'application/json')
//             res.send(JSON.stringify(ecg))
//         }
//     } catch (error) {
//         console.log(error)
//         if (isMongoError(error)) {
//             res.status(500).send('Internal server error')
//         } else {
//             console.log(error)
//             res.status(400).send('Bad Request')
//         }
//     }
// })

router.get('/timequery', mongoChecker, async (req, res) => {
    console.log(req.query)
    const max = req.query.max
    const min = req.query.min
    if (!max && !min) {
        res.status(400).send('Bad Request')
        return
    }

    let mongoose_query;
    if (!max) {
        mongoose_query = {'ts': {$gte: min}}
    } else if (!min) {
        mongoose_query = {'ts': {$lte: max}}
    } else {
        mongoose_query = {'ts': {$gte: min, $lte: max}}
    }
    const ecg = await Record.find(mongoose_query, "data ts")
    res.send(JSON.stringify(ecg))
})

router.get('/record/all/:token', mongoChecker, async (req, res) => {

    if (req.params.token !== "secret token :D") {
        res.status(401).send()
        return
    }

    try {
        const records = await Record.find();
        if (!records) {
            res.status(500).send("server error")
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(records))
        }
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send("database error")
        } else {
            console.log(error)
            res.status(500).send("server error")
        }
    }
})


module.exports = router;