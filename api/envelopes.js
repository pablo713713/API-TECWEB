const express = require('express');
const { getEnvelopeById, getAllEnvelopes, addEnvelopeToDatabase, makeTransaction, updateEnvelopeById, deleteEnvelopeById, deleteTransactionById, moveTransaction } = require('./db');
const envelopesRouter = express.Router();

envelopesRouter.param('id', (req, res, next, id) => {
    try {
        getEnvelopeById(Number(id))
        req.envelopeId = Number(id);
        next();
    } catch(error) {
        next(error);
    }
});

const errorHandler = (err, req, res, next) => {
    const codeStatus = Number(err.message.substring(0,3));
    res.status(codeStatus).send(err.message);
};

envelopesRouter.get('/', (req, res, next) => {
    try {
        const envelopes = getAllEnvelopes();
        const response = {envelopes: envelopes};
        res.json(response);
    } catch(error) {
        next(error);
    }
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
        res.status(400).send('Missing required fields [name OR/AND limit]');
    }
};

envelopesRouter.post('/', validateEnvelope, (req, res, next) => {
    const newEnvelope = addEnvelopeToDatabase(req.body)
    res.json(newEnvelope);
});

envelopesRouter.post('/:id', (req, res, next) => {
    const { amount, description } = req.body;
    if ( amount && description) {
        try {
            const updatedEnvelope = makeTransaction(req.envelopeId, req.body);
            return res.json(updatedEnvelope);
        } catch(error) {
            next(error);
        }
    } else {
        res.status(400).json({ error: "Missing required fields [amount OR/AND description]" });
    };
});

envelopesRouter.put('/:id', validateEnvelope, (req, res, next) => {
    const updatedEnvelope = updateEnvelopeById(req.envelopeId, req.body);
    return res.json(updatedEnvelope);
});

envelopesRouter.delete('/:id', (req, res, next) => {
    const deleted = deleteEnvelopeById(req.envelopeId);
    const responseObject = {
        name: deleted.name,
        status: "DELETED",
        date: new Date()
    };
    res.status(200).json(responseObject);
});

envelopesRouter.delete('/:id/transactions/:transactionId', (req, res, next) => {
    try {
        const deleted = deleteTransactionById(req.envelopeId, Number(req.params.transactionId));
        res.status(204).send();
    } catch(error) {
        next(error);
    }
});

envelopesRouter.put('/:id/transactions/:transactionId/:targetId', (req, res, next) => {
    try {
        const updatedEnvelope = moveTransaction(req.envelopeId, Number(req.params.targetId), Number(req.params.transactionId));
        return res.json(updatedEnvelope);
    } catch(error) {
        next(error);
    }
});

module.exports = { envelopesRouter, errorHandler };