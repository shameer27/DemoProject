var express = require('express');
var bodyParser = require('body-parser');
// var mysql = require('mysql');
//var assert = require('assert');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demoproj');
var users = mongoose.model('test', {
    name: { type: String },
    mail: { type: String },
    phno: { type: String },
    dob: { type: String },
    status: { type: String, default: "inactive" },
    adminflag: { type: Boolean, default: false },
    pwd: { type: String }

}); //Model declaration

app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.post('/reg', function (req, res) {
    var datavalue = new users(req.body);
    console.log("Data---", datavalue);
    //console.log(typeof datavalue, "datavalue")
    datavalue.save(function (err, data) { //Query To insert details to mongodb
        //console.log(data, "after saved");
        if (err) {
            res.send({ code: 1 })
        }
        else {
            console.log(data);
            res.send({ code: 0 })
        }
    });
});
app.post('/login', function (req, res) {
    var datavalue = req.body;

    console.log("Data---", datavalue);
    if (datavalue.adminflag) {
        var query = {
            mail: datavalue.mail,
            pwd: datavalue.pwd,
            adminflag: datavalue.adminflag,
        }
        users.findOne(query).exec(function (err, data) {
            if (err) {
                res.send({ status: "1", err: err });
            } else {
                console.log(data, "demo1 value")
                res.send({ status: "0", data: data });
            }
        });

    } else {
        var query = {
            mail: datavalue.mail,
            pwd: datavalue.pwd,
        }
        users.findOne(query).exec(function (err, data) {
            if (err) {
                res.send({ status: "1", err: err });
            } else {
                console.log(data, "demo1 value")
                if (data.status == "active") {
                    res.send({ status: "0", data: data });
                } else {
                    res.send({ status: "0", message: "please verify your account", data: data })
                }
            }
        });
    }
    //console.log(typeof datavalue, "datavalue")

});
app.get('/getdata', function (req, res) {
    users.find({}).exec(function (err, demo1) {
        if (err) {

        } else {
            res.send({ status: "1", data: demo1 });
        }
    });
});
app.get('/getdatauser/:mail', function (req, res) {
    console.log(req.params.mail, "sd")
    var query = {
        mail: req.params.mail
    }
    users.findOne(query).exec(function (err, demo1) {
        if (err) {

        } else {
            res.send({ status: "0", data: demo1 });
        }
    });
});
app.put('/userupddata', function (req, res) {
    console.log(req.body)
    var update = {
        name: req.body.name,
        mail: req.body.mail,
        phno: req.body.phno,
        pwd: req.body.pwd,
        status: req.body.status,
        dob: req.body.dob,
    }
    var datavalue = new users(req.body);
    users.findOneAndUpdate({ 'mail': req.body.mail }, update).exec(function (err, demo1) {
        if (err) {

        } else {

            res.send({ status: "1" });
        }
    });
});
app.put('/upddata', function (req, res) {
    var update = {
        name: req.body.name,
        mail: req.body.mail,
        phno: req.body.phno,
        pwd: req.body.pwd,
        status: req.body.status,
        dob: req.body.dob,
    }
    var datavalue = new users(req.body);
    users.findOneAndUpdate({ '_id': req.body.id }, update).exec(function (err, demo1) {
        if (err) {

        } else {

            res.send({ status: "1" });
        }
    });
});
app.delete('/deldata/:id', function (req, res) {
    console.log(req.params.id, "delete data")
    users.findOne({ '_id': req.params.id }).exec(function (err, demo1) {
        if (err) {

        } else {
            demo1.remove();
            res.send({ status: "1" });
        }
    });
});
app.listen(2500);
