const Test = require('../module/user.modules');
const bcrypt = require("bcrypt");
const auth=require("../Middleware/Middleware")
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    if (!req.body.email && !req.body.password) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    Test.findOne({ email: req.body.email })
    .then(async data => {
        console.log(data)
     if(data){
        const isMatch = await bcrypt.compare(req.body.password, data.password);
        console.log(isMatch)
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
          const payload = {
            user: {
              id: data.id
            }
          };
    
          jwt.sign(
            payload,
            "randomString",
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token,
                data
              });
            }
          );
     }else{
        return res.status(404).send({
            message: "Invalid Email or Password"
        });
     }
    })
    .catch(err=>{
        return res.status(404).send({
            message: "Login Failed" + req.body.email
        })
    })

}


exports.register = (req, res) => {
    if (!req.body.email && !req.body.password) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    const {
        username,
        email,
        password
    } = req.body;
    // Create a Note
    const test = new Test({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
 
    // Save Note in the database
    Test.findOne({ email: req.body.email })
        .then(async(data) => {
            if (data) {
                return res.status(404).send({
                    message: "Already Register " + req.body.email
                });
            }
            const salt = await bcrypt.genSalt(10);
            test.password = await bcrypt.hash(password, salt);
            test.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note."
                    });
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(404).send({
                message: "Already Register" + req.body.email
            })
        })
};

exports.user =async (req, res) => {
    const user = await Test.findById(req.user.id);
    if(!user){
        res.send("Error")
    }
    res.json(user);
};