const Test = require('../module/user.modules');
exports.login = (req, res) => {
    if (!req.body.email && !req.body.password) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    Test.findOne({ email: req.body.email,password:req.body.password })
    .then(data => {
     if(data){
        res.send(data);
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

    // Create a Note
    const test = new Test({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
 
    // Save Note in the database
    Test.findOne({ email: req.body.email })
        .then(data => {
            if (data) {
                return res.status(404).send({
                    message: "Already Register " + req.body.email
                });
            }
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