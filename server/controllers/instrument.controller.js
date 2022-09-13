const Instrument = require('../models/instruments.model');

// business logic 

module.exports = {

    //CREATE
    createInstrument: (req, res)=> {
        Instrument.create(req.body)
            .then((newInstrument)=> {
                console.log(newInstrument);
                res.json(newInstrument);
            })
            .catch((err)=> {
                console.log(err);
                res.status(400).json(err);
            })
    }, 

    //GET ONE 
    getOneInstrument: (req, res)=> {
        Instrument.findById({_id: req.params.id})
            .then((oneInstrument)=> {
                res.json(oneInstrument);
            })
            .catch((err)=> {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //GET ALL 
    getAllInstruments: (req, res)=> {
        Instrument.find({})
        .then((allInstruments)=> {
            res.json(allInstruments);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    //DELETE
    deleteInstrument: (req, res)=> {
        Instrument.deleteOne({_id: req.params.id})
            .then((deletedInstrument)=> {
                res.json(deletedInstrument);
            })
            .catch((err)=> {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //UPDATE:
    editInstrument: (req,res)=> {
        Instrument.findByIdAndUpdate({_id: req.params.id},
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then((updatedInstrument)=> {
                res.json(updatedInstrument);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    }
}