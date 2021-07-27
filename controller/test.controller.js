const Test = require('../module/test.modules.js');

// Create and Save a new Note
exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const test = new Test({
        imgurl: req.body.imgurl,
        name: req.body.name,
        price:req.body.price,
        description:req.body.description
    });

    // Save Note in the database
    test.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Test.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Test.findById(req.params._id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(data);
    }).catch(err => {
        console.log(err)
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};