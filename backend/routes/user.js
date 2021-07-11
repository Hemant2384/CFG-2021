const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");

const school = require("../models/school");
const volunteer=require("../models/volunteer");

router.post("/school/register", (req, res) => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  school.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new school({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        city:req.body.city,
        pincode:req.body.pincode,
        schoolID:req.body.schoolID,
        password: req.body.password,
        confirmationCode: token,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(()=>console.log(newUser))
          .catch((err) => console.log(err));
          let mailOptions = {
            from: "cfgteam44@gmail.com",
            to: newUser.email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
          <h2>Hello ${newUser.username}</h2>
          <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
          <a href=https://team-44-for-win.herokuapp.com/users/confirm/${newUser.confirmationCode}> Click here</a>
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
              res.send('<style>.bg { background: #3a3a3a;width: 100vw; height: 100vh; }.title {color: rgba(202, 57, 57, 0.85);font-family: "Raleway", "Lato", "Helvetica Neue", Arial, sans-serif;font-size: 5vw;font-weight: 800;text-align: center;text-shadow: 0 1px 9px rgba(0, 0, 0, 0.8);margin: auto;margin-top: 0;padding-top: 7vh;} .blog-card { display: block; position: relative; top: 7vw; width: 400px; height: 250px; margin: auto; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.85); transition: all 450ms ease-out 0s; overflow: hidden; } .blog-card .blog-img { position: absolute; min-width: 100%; min-height: 100%; height: 100%; top: -9999px; left: -9999px; right: -9999px; bottom: -9999px; margin: auto; overflow: hidden; } .blog-card:hover { box-shadow: 0 2px 35px rgba(0, 0, 0, 0.85); } .blog-card:hover .text-overlay { background: rgba(255, 255, 255, 0.8); height: 50%; top: 50%; transition: all 450ms ease-in-out 0s; } .blog-card:hover p { height: 60px; transition: all 350ms ease-in-out 0s; } .blog-card:hover p a { visibility: visible; } .text-overlay { position: relative; background: rgba(255, 255, 255, 0.6); width: 100%; height: 40%; top: 60%; box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.3); padding: 10px 12px; overflow: hidden; transition: all 450ms ease-in-out 0s; cursor: pointer; } .text-overlay h2 { color: rgba(0, 0, 0, 0.85); letter-spacing: 0.0225em; width: auto; margin: 0; } .text-overlay p { color: #555; width: 380px; height: 38px; margin: 8px 0; line-height: 1.25; text-overflow: ellipsis; overflow: hidden; } .text-overlay a { color: #378aee; text-decoration: none; transition: all 350ms linear; visibility: hidden; } .text-overlay a:hover { color: #449cc5; border-bottom: 1px dotted #47a8f2; } .credit { position: relative; color: rgba(255, 255, 255, 0.85); font-family: "Lato", "Helvetica Neue", Arial, sans-serif; font-size: 1.5em; font-weight: 300; text-align: center; bottom: -22vh; } .credit .creator-link { color: rgba(255, 255, 255, 0.95); font-family: "Kaushan Script", "Lato", "Helvetica Neue", sans-serif; font-size: 1.05em; font-weight: 600; letter-spacing: 0.5px; text-decoration: none; transition: all 350ms linear; } .credit .creator-link:hover { color: #44bcc5; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6); transition: all 350ms linear; }</style> <section class="bg"> <h1 class="title">VERIFY YOUR EMAIL!</h1> <div class="blog-card"> <img class="blog-img" src="https://user-images.githubusercontent.com/16360374/37567282-e1932872-2a81-11e8-807b-efc5a997f2f1.jpg" /> <div class="text-overlay"> <h2>We Have Sent You An Email Verification!</h2> <p>We sent an email to your account. To continue, please check your email and verify your account</p> </div> </div> </section>');
            }
          });
        });
      });
    }
  });
});

router.post("/volunteer/register", (req, res) => {
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }
    volunteer.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new volunteer({
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
          city:req.body.city,
          pincode:req.body.pincode,
          interest:req.body.interest,
          contact:req.body.contact,
          dob:req.body.dob,
          blood:req.body.blood,
          duration:req.body.duration,
          profession:req.body.profession,
          password: req.body.password,
          confirmationCode: token,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(()=>console.log(newUser))
            .catch((err) => console.log(err));
            let mailOptions = {
              from: "cfgteam44@gmail.com",
              to: newUser.email,
              subject: "Please confirm your account",
              html: `<h1>Email Confirmation</h1>
            <h2>Hello</h2>
            <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
            <a href=https://team-44-for-win.herokuapp.com/users/confirm/${newUser.confirmationCode}> Click here</a>
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
                res.send('<style>.bg { background: #3a3a3a;width: 100vw; height: 100vh; }.title {color: rgba(202, 57, 57, 0.85);font-family: "Raleway", "Lato", "Helvetica Neue", Arial, sans-serif;font-size: 5vw;font-weight: 800;text-align: center;text-shadow: 0 1px 9px rgba(0, 0, 0, 0.8);margin: auto;margin-top: 0;padding-top: 7vh;} .blog-card { display: block; position: relative; top: 7vw; width: 400px; height: 250px; margin: auto; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.85); transition: all 450ms ease-out 0s; overflow: hidden; } .blog-card .blog-img { position: absolute; min-width: 100%; min-height: 100%; height: 100%; top: -9999px; left: -9999px; right: -9999px; bottom: -9999px; margin: auto; overflow: hidden; } .blog-card:hover { box-shadow: 0 2px 35px rgba(0, 0, 0, 0.85); } .blog-card:hover .text-overlay { background: rgba(255, 255, 255, 0.8); height: 50%; top: 50%; transition: all 450ms ease-in-out 0s; } .blog-card:hover p { height: 60px; transition: all 350ms ease-in-out 0s; } .blog-card:hover p a { visibility: visible; } .text-overlay { position: relative; background: rgba(255, 255, 255, 0.6); width: 100%; height: 40%; top: 60%; box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.3); padding: 10px 12px; overflow: hidden; transition: all 450ms ease-in-out 0s; cursor: pointer; } .text-overlay h2 { color: rgba(0, 0, 0, 0.85); letter-spacing: 0.0225em; width: auto; margin: 0; } .text-overlay p { color: #555; width: 380px; height: 38px; margin: 8px 0; line-height: 1.25; text-overflow: ellipsis; overflow: hidden; } .text-overlay a { color: #378aee; text-decoration: none; transition: all 350ms linear; visibility: hidden; } .text-overlay a:hover { color: #449cc5; border-bottom: 1px dotted #47a8f2; } .credit { position: relative; color: rgba(255, 255, 255, 0.85); font-family: "Lato", "Helvetica Neue", Arial, sans-serif; font-size: 1.5em; font-weight: 300; text-align: center; bottom: -22vh; } .credit .creator-link { color: rgba(255, 255, 255, 0.95); font-family: "Kaushan Script", "Lato", "Helvetica Neue", sans-serif; font-size: 1.05em; font-weight: 600; letter-spacing: 0.5px; text-decoration: none; transition: all 350ms linear; } .credit .creator-link:hover { color: #44bcc5; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6); transition: all 350ms linear; }</style> <section class="bg"> <h1 class="title">VERIFY YOUR EMAIL!</h1> <div class="blog-card"> <img class="blog-img" src="https://user-images.githubusercontent.com/16360374/37567282-e1932872-2a81-11e8-807b-efc5a997f2f1.jpg" /> <div class="text-overlay"> <h2>We Have Sent You An Email Verification!</h2> <p>We sent an email to your account. To continue, please check your email and verify your account</p> </div> </div> </section>');
              }
            });
          });
        });
      }
    });
  });
router.get("/confirm/:confirmationCode", (req, res) => {
  school.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
          volunteer.findOne({confirmationCode: req.params.confirmationCode,})
          .then((user2) => {
            if (!user2) {
                return res.status(404).send({ message: "User Not found." });
            }
            if(user2){
                user2.status = "Active";
      user2.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      })
    .catch((e) => console.log("error", e));
    res.send("confirmed")

            }
          })
        }
    user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
    res.send("confirmed")
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  school.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
        volunteer.findOne({email})
          .then((user2) => {
            if (!user2) {
                return res.status(404).send({ message: "User Not found." });
            }
            if (user2.status != "Active") {
                return res.status(401).send({
                  message: "Pending Account. Please Verify Your Email!",
                });
              }
              if(user2.verified==0){
                return res.status(404).send({ message: "User not verified" });
              }
              // Check password
              bcrypt.compare(password, user2.password).then((isMatch) => {
                if (isMatch) {
                  // User matched
                  // Create JWT Payload
                  const payload = {
                    id: user2.id,
                  };
          
                  // Sign token
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                      expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token,
                        role:user2.role,
                      });
                    }
                  );
                } else {
                  return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
                }
              });
            });
          }
    if (user.status != "Active") {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }
    if(user.verified==0){
      return res.status(404).send({ message: "User not verified" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              role:user.role,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
