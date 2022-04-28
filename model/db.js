const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, (err) => {
        if (!err) {
            console.log('Mongodb connection successed')
        } else {
            console.log('Mongodb connection failed due to ' + err)
        }
    });
require('./employee.model');
