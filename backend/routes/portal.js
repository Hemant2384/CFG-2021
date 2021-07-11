const express = require("express");
const router = express.Router();

let School=require('../models/school');
let Requirement = require('../models/Requirements')
let Volunteer = require('../models/volunteer')

//read all data
router.get("/school", (req, res) => {
    School.find()
        .then(exc => res.json(exc))
        .catch(err => res.status(400).json("Error is " + err));
  });
router.post("/verify/:id/school",(req,res)=>{
  if(req.body.checked){
    School.findById(req.params.id)
    .then(exc=>{exc.verified=1
    exc.save()})
    .catch(err=> res.status(400).json("Error is " + err));
    res.send("verified")
    }
  });
  router.get("/verify/allschool", (req, res) => {
    School.find({verified:"1",status:"Active"})
        .then(exc => res.json(exc))
        .catch(err => res.status(400).json("Error is " + err));
  });
  router.get("/notverified/allschool", (req, res) => {
    School.find({verified:"0",status:"Active"})
        .then(exc => res.json(exc))
        .catch(err => res.status(400).json("Error is " + err));
  });

  router.post("/verify/:id/volunteer",(req,res)=>{
    if(req.body.checked){
      Volunteer.findById(req.params.id)
      .then(exc=>{
        exc.verified=1;
      exc.save();
    })
      .catch(err=> res.status(400).json("Error is " + err));
      res.send("verified")
      }
    });
    router.get("/verify/allvolunteer", (req, res) => {
      School.find({verified:"1",status:"Active"})
          .then(exc => res.json(exc))
          .catch(err => res.status(400).json("Error is " + err));
    });
    router.get("/notverified/allvounteer", (req, res) => {
      School.find({verified:"0",status:"Active"})
          .then(exc => res.json(exc))
          .catch(err => res.status(400).json("Error is " + err));
    });
  router.get("/volunteer", (req, res) => {
    Volunteer.find()
        .then(exc => res.json(exc))
        .catch(err => res.status(400).json("Error is " + err));
  });
  //read data by id
  router.get("/volunteer/:id", (req, res) => {
    Volunteer.findById(req.params.id)
      .then(exc => res.json(exc))
      .catch(err => res.status(400).json("Error is " + err));       
  });

   //read data by id
   router.get("/school/:id", (req, res) => {
    School.findById(req.params.id)
      .then(exc => res.json(exc))
      .catch(err => res.status(400).json("Error is " + err));       
  });


  router.get("/requirement", (req, res) => {
    Requirement.find()
        .then(exc => res.json(exc))
        .catch(err => res.status(400).json("Error is " + err));
  });

  router.get("/requirement/:id", (req, res) => {
    Requirement.findById(req.params.id)
      .then(exc => res.json(exc))
      .catch(err => res.status(400).json("Error is " + err));       
  });

  router.get("/requirement/:rid/add-more/:num", (req, res) => {
        
    Requirement.findById(req.params.rid)
    .then(exc => {
        Volunteer.find().limit(num)
        .then(exce => {    
            exc.volunteer.push(exce._id);
            exc.public=exc.public-1;
            exc.save() 
            exce.requirement.push(exc._id);
            exce.save()
            .then(()=>console.log(exce))
            .catch((err) => console.log(err));
            let mailOptions = {
              from: "cfgteam44@gmail.com",
              to: newUser.email,
              subject: "Please confirm your account",
              html: `<h1>Email Confirmation</h1>
            <h2>Hello ${newUser.username}</h2>
            <p>You have been alloted a new activity!</p>
            <p>the details are : ${exc.requirement}; city:${exc.city} ; Date: ${exc.date}</p>
            </div>`,
            };
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "cfgteam44@gmail.com",
                pass: process.env.password,
              },
            });
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
                res.send("mail sent https://team-44-for-win.herokuapp.com/confirm/newUser.confirmationCode!");
              }
            });

    })
    .catch(err => res.status(400).json("Error is " + err));        
    })
    .catch(err => res.status(400).json("Error is " + err));
        
  });


  router.post("/requirement/:rid/add-volunteers", (req, res) => {
    Requirement.findById(req.params.rid)
    .then(exc => {
        exc.public = req.body.public;
        exc.save()
        .then(() => res.json("Volunteer number added successfully"))
        .catch(err => res.status(400).json("Error is " + err));       
    })
    .catch(err => res.status(400).json("Error is " + err));  
  });
  
  module.exports = router;
  



  