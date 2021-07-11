const express = require("express");
const router = express.Router();

let School=require('../models/school');
let Requirement = require('../models/Requirements')
//read all data
router.get("/", (req, res) => {
    School.find()
        .then(exc => res.json(exc))
        .catch(err => res.status(400).json("Error is " + err));
  });
  
  router.post("/:id/add-requirement", (req, res) => {
  
    School.findById(req.params.id)
    .then(School => {
        const requirement = req.body.requirement;
        const interest = req.body.interest;
        const date = req.body.date;
        const new_requirement = new Requirement({requirement, interest, date});
        new_requirement.city= School.city;
        new_requirement.school=School.id;
        new_requirement.save()
                  .then(() => res.json("School Requirement created Successfully"))
                  .catch(err => res.status(400).json("Error is " + err));
                  School.requirements.push(new_requirement._id);
                  School.save();

    })     
    .catch(err => res.status(400).json("Error is " + err));  
    });
  
  //read data by id
  router.get("/:id", (req, res) => {
    School.findById(req.params.id)
      .then(exc => res.json(exc))
      .catch(err => res.status(400).json("Error is " + err));       
  });
  
  //delete data by id
  router.delete("/delete/:id", (req, res) => {
    School.findByIdAndDelete(req.params.id)
      .then(() => res.json("School deleted successfully"))
      .catch(err => res.status(400).json("Error is " + err));       
  });
  
  //update data by id
  router.post("/update/:id", (req, res) => {
      School.findById(req.params.id)
          .then(exc => {
              exc.name = req.body.name;
              exc.pincode = req.body.pincode;
              exc.city = req.body.city;
              exc.address = req.body.address;
              exc.schoolID = req.body.schoolID;
  
              exc.save()
              .then(() => res.json("Updates successfully"))
              .catch(err => res.status(400).json("Error is " + err));       
          })
          .catch(err => res.status(400).json("Error is " + err));       
    
  });
  
  
  
  
  
  module.exports = router;