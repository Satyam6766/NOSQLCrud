const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    var emp = new Employee();
    emp.fullName = req.body.FullName;
    emp.email = req.body.Email;
    emp.mobile = req.body.Mobile;
    emp.city = req.body.City;
    emp.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            console.log('Error during record insertion due to' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id },
        {
            fullName: req.body.FullName,
            email: req.body.Email,
            mobile: req.body.Mobile,
            city: req.body.City
        }, (err, docs) => {
            if (!err) {
                res.redirect('employee/list');
            }
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);  //yet to be coded
                    res.render("employee/addOrEdit", {
                        viewTitle: "Update Employee",
                        employee: req.body
                    });
                } else {
                    console.log("Error during record update due to:" + err);
                }
            }
        });
}
let totalCount;
function CountRecord(req, res) {
    Employee.countDocuments((err, docs) => {
        if (!err) {
            totalCount = docs;
            // console.log(totalCount);
        }
    });
}

router.get('/list', (req, res) => {
    console.log("list route test");
    Employee.find((err, docs) => {
        if (!err) {
           CountRecord(req, res);
            res.render("employee/list", {
                 list: docs,totalRowCount: totalCount
            });
        }
        else {
            console.log("Err in retriving employee list due to" + err);
        }
    });

});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: docs
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log("Error in deletion due to:" + err);
        }
    })
});


module.exports = router;