const InstrumentController = require("../controllers/instrument.controller");

module.exports = (app) => {
    app.get(`/api/instruments`, InstrumentController.getAllInstruments);
    app.post(`/api/instruments`, InstrumentController.createInstrument);
    app.put(`/api/instruments/:id`, InstrumentController.editInstrument);
    app.delete(`/api/instruments/:id`, InstrumentController.deleteInstrument);
    app.get(`/api/instruments/:id`, InstrumentController.getOneInstrument);
}