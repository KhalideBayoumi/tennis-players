'use strict';

var express = require("express");
var app = express();
var jsonData = require('./headtohead.json');

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/players", (req, res) => {
    res.json(jsonData['players'].sort(sortByProperty('id')));
});

app.get("/players/:id", (req, res) => {
    let player = jsonData['players'].find(x => x.id == req.params.id);
    if(player != undefined) res.json(player);
    else res.status(404).send();
});

app.delete("/players/:id", (req, res) => {
    let playerIndex = jsonData['players'].findIndex(x => x.id == req.params.id);
    if(playerIndex != -1) {
        jsonData['players'].splice(playerIndex, 1); // remove data, but also the 'place' of the object
        res.json(jsonData['players']);
    }
    else res.status(404).send();
});

/**
 * Array sorting
 *
 * @param property
 * @returns {Function}
 */
var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

module.exports = app; // for testing