const express = require("express");

async function directorPage(req, res) {
    try {
        res.status(201).render("pages/director");

    } catch (error) {
        res.status(401).send(error)
    }
};



async function labheadPage(req, res) {
    try {
        res.status(201).render("login/loginPage");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function receptionPage(req, res) {
    try {
        res.status(201).render("login/loginPage");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function financePage(req, res) {
    try {
        res.status(201).render("login/loginPage");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function testerPage(req, res) {
    try {
        res.status(201).render("login/loginPage");

    } catch (error) {
        res.status(401).send(error)
    }
};


module.exports = {
    director: directorPage,
    labhead: labheadPage,
    reception: receptionPage,
    finance: financePage,
    tester: testerPage,
}