const express = require('express');
const router = express.Router();
const { ecg } = require('../models/Post');
const {request} = require("express");

router.get('/record', async(req,res) => {
    try{
        let ecg = await Post.findById(req.params.ts);
        if (!ecg) {
            res.status(404).send()
        } else {
            res.send(ecg)
        }
    } catch (error){
        console.log(error)
        res.status(400).send('Bad Request')
        }
})