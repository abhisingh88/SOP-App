const express = require("express")
const hbs = require("hbs");
const router = new express.Router()

var projects = {
    name : 'Rahul', 
    skills : ['Data Mining', 'BlockChain Dev', 'node.js']
}
  
router.get('/', (req, res)=>{
    res.status(201).render("projects", {project : project});
})