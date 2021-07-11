const express = require("express");
const router = express.Router();

// let Volunteer=require('../models/Volunteer');
let Requirement = require('../models/Requirements');
let Volunteer = require('../models/volunteer')
let Feedback=require('../models/feedback');
//read all data

router.get("/", (req, res) => {
    Volunteer.find()
        .then(exc => res.json(exc))
        .catch(err => res.status(400).json("Error is " + err));
  });

  router.post("/:id/feedback",(req,res)=>{
   Volunteer.findById(req.params.id)
    .then(exc=>{
      const eventid=exc.requirement[exc.requirement.length-1]
      const newfeedback = new Feedback({
        attendance: req.body.attendance,
        requirement: eventid,
        description:req.body.description,
        volunteer:req.params.id
      });
      newfeedback
        .save()
        .then(() => res.status(200).json(newfeedback))
        .catch((err) => console.log(err));

    })
    .catch(err=>res.status(400).json("Error is " + err));     
  })
  
  //read data by id
  router.get("/:id", (req, res) => {
    Volunteer.findById(req.params.id)
      .then(exc => res.json(exc))
      .catch(err => res.status(400).json("Error is " + err));       
  });
  
  //delete data by id
  router.delete("/delete/:id", (req, res) => {
    Volunteer.findByIdAndDelete(req.params.id)
      .then(() => res.json("Volunteer deleted successfully"))
      .catch(err => res.status(400).json("Error is " + err));       
  });
  
  //update data by id
  router.post("/update/:id", (req, res) => {
      Volunteer.findById(req.params.id)
          .then(exc => {
              exc.name = req.body.name;
              exc.pincode = req.body.pincode;
              exc.city = req.body.city;
              exc.address = req.body.address;
              exc.interest = req.body.interest;
              exc.dob = req.body.dob;
              exc.contact = req.body.contact;
              exc.blood = req.body.blood;
              exc.duration = req.body.duration;
              exc.profession = req.body.profession;
             
              exc.save()
              .then(() => res.json("Volunteer Updated successfully"))
              .catch(err => res.status(400).json("Error is " + err));       
          })
          .catch(err => res.status(400).json("Error is " + err));       
    
  });
  

  router.get("/:id/future-meetings", (req, res) => {
   
    const today = new Date();
    const year=today.getFullYear();
    const month=today.getMonth()+1;
    const d=today.getDate();

    Volunteer.findById(req.params.id)
    .then(exc => {
      Requirement.find({"city": exc.city,"interest" : exc.interest})
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json("Error is " + err));      
  });

  router.post("/:id/accept/:rid",(req,res)=> {

      Volunteer.findById(req.params.id)
      .then(exc => {
          exc.requirement.push(req.params.rid);
          exc.save()
          .then(() => res.json("saved successfully"))
          .catch(err => res.status(400).json("Error is " + err));     
          Requirement.findById(req.params.rid)
          .then(excs => {
            excs.volunteer.push(req.params.id);
            excs.status=1;
            excs.public=excs.public-1
            excs.save()
            .then(() => res.json("saved successfully"))
          .catch(err => res.status(400).json("Error is " + err));  
        })
        .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json("Error is " + err));
  });

 




  
  module.exports = router;