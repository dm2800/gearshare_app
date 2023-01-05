const Instrument = require("../models/instruments.model");
const jwt = require("jsonwebtoken");

// business logic

module.exports = {
    //CREATE
    createInstrument: (req, res) => {
        const newInstrumentObject = new Instrument(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true,
        });

        newInstrumentObject.createdBy = decodedJWT.payload.id;

        newInstrumentObject
            .save()
            .then((newInstrument) => {
                console.log(newInstrument);
                res.json(newInstrument);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //GET ONE
    getOneInstrument: (req, res) => {
        Instrument.findById({ _id: req.params.id })
            .populate("createdBy", "username email")
            .then((oneInstrument) => {
                res.json(oneInstrument);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //GET ALL
    getAllInstruments: (req, res) => {
        Instrument.find({})
            .populate("createdBy", "username email")
            .then((allInstruments) => {
                res.json(allInstruments);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //DELETE
    deleteInstrument: (req, res) => {
        Instrument.deleteOne({ _id: req.params.id })
            .then((deletedInstrument) => {
                res.json(deletedInstrument);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //UPDATE:
    editInstrument: (req, res) => {
        Instrument.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedInstrument) => {
                res.json(updatedInstrument);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    findAllInstrumentsByUser: (req, res) => {
        if (req.jwtpayload.username !== req.params.username) {
            console.log("not the user");
            User.findOne({ username: req.params.username })
                .then((userNotLoggedIn) => {
                    Instrument.find({ createdBy: userNotLoggedIn._id })
                        .populate("createdBy", "username")
                        .then((allInstrumentsFromUser) => {
                            console.log(allInstrumentsFromUser);
                            res.json(allInstrumentsFromUser);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                });
        } else {
            console.log("current user");
            console.log("req.jwtpayload.id:", req.jwtpayload.id);
            Instrument.find({ createdBy: req.jwtpayload.id })
                .populate("createdBy", "username")
                .then((allInstrumentsFromLoggedInUser) => {
                    console.log(allInstrumentsFromLoggedInUser);
                    res.json(allInstrumentsFromLoggedInUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                });
        }
    },
};
