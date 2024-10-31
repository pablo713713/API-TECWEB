const express = require('express');
const { getEnvelopeById, getAllEnvelopes, addEnvelopeToDatabase, makeTransaction, updateEnvelopeById } = require('./db');
const envelopesRouter = express.Router();

envelopesRouter.param('id', (req, res, next, id) => {
    const envelope = getEnvelopeById(Number(id))
    if (envelope) {
        req.envelopeId = Number(id);
        next();
    } else {
        res.status(404).send('Envelope not found');
    }
});

envelopesRouter.get('/', (req, res, next) => {
    const envelopes = getAllEnvelopes();
    const response = {envelopes: envelopes};
    res.json(response);
});

envelopesRouter.get('/:id', (req, res, next) => {
    const envelope = getEnvelopeById(req.envelopeId);
    res.json(envelope);
});

const validateEnvelope = (req, res, next) => {
    const { name, limit } = req.body;
    if (name && limit) {
        next();
    } else {
        res.status(400).send('Missing required fields');
    }
};


envelopesRouter.post('/', validateEnvelope, (req, res, next) => {
    const newEnvelope = addEnvelopeToDatabase(req.body)
    res.json(newEnvelope);
});

envelopesRouter.put('/:id', validateEnvelope, (req, res, next) => {
    const { spent, description } = req.body;
    if ( spent && description) {
        const updatedEnvelope = makeTransaction(req.envelopeId, req.body);
        if (updatedEnvelope) {
            return res.json(updatedEnvelope);
        }
    } else {
        const updatedEnvelope = updateEnvelopeById(req.envelopeId, req.body);
        if (updatedEnvelope) {
            return res.json(updatedEnvelope);
        }
    }
    res.status(404).send('Envelope not found');
});

module.exports = envelopesRouter;