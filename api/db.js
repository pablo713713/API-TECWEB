let envelopeId = 0;
let transactionId = 0;

const envelopesObjects = [
    createEnvelope({name: "Food", limit: 200}),
    createEnvelope({name: "Rent", limit: 1000}),
    createEnvelope({name: "Tools", limit: 500})
];

function generateId(type) {
    if (type == 'envelope') {
        envelopeId++;
        return envelopeId;
    } else if(type == 'transaction') {
        transactionId++;
        return transactionId;
    }
}

/**
 * 
 * @param {Object} envelopeObject 
 * @returns {Object} Envelope budget object
 */

function createEnvelope(envelopeObject) {
    return {
        name: envelopeObject.name,
        limit: envelopeObject.limit,
        spent: 0,
        get balance(){
            return this.limit - this.spent;
        },
        transactions: [],
        id: generateId('envelope')
    };
}

function addEnvelopeToDatabase(envelopeObject) {
    envelopesObjects.push(createEnvelope(envelopeObject));
    return envelopesObjects[envelopesObjects.length - 1];
}

function getEnvelopeById(id) {
    const envelopeFound = envelopesObjects.find(envelope => envelope.id === id);
    if (envelopeFound) {
        return envelopeFound;
    } else {
        throw new Error(`404: Envelope with ID:${id} not found!`);
    }
}

function getTransactionIndexById(envelope, id) {
    const transactionIndex = envelope.transactions.findIndex(transac => transac.id === id);
    if (transactionIndex !== -1) {
        return transactionIndex;
    } else {
        throw new Error(`404: Transaction with ID:${id} not found in ${envelope.name} envelope!`);
    }
}


function getAllEnvelopes() {
    if (envelopesObjects) {
        return envelopesObjects;
    } else {
        throw new Error(`404: Not found! Evelopes are empty`);
    }
    
}

function deleteEnvelopeById(id) {
    const index = envelopesObjects.findIndex(envelope => envelope.id === id);
    const objectToDelete = envelopesObjects[index];
    envelopesObjects.splice(index, 1);
    return objectToDelete;
}

function updateEnvelopeById(id, envelopeObject) {
    const index = envelopesObjects.findIndex(envelope => envelope.id === id);
    envelopesObjects[index] = Object.assign(envelopesObjects[index], envelopeObject);
    return envelopesObjects[index];
}

function validateTransaction(envelopeObject, transaction) {
    if (transaction.amount + envelopeObject.spent <= envelopeObject.limit) {
        return true;
    } else {
        throw new Error(`403: Transaction exceeds budget limit`);
    }
}

function makeTransaction(envelopeId, transaction) {
    const envelope = getEnvelopeById(envelopeId);
    validateTransaction(envelope, transaction);
    if (transaction.date && transaction.id) {
        envelope.transactions.push({
            ...transaction,
        });
    } else {
        envelope.transactions.push({
            date: new Date(),
            ...transaction,
            id: generateId('transaction')
        });
    }
    envelope.spent += transaction.amount;
    return envelope;
}

function deleteTransactionById(envelopeId, transactionId) {
    const envelope = getEnvelopeById(envelopeId);
    const transactionIndex = getTransactionIndexById(envelope, transactionId);
    const amountToRestitute = envelope.transactions[transactionIndex].amount;
    envelope.spent -= amountToRestitute;
    envelope.transactions.splice(transactionIndex, 1);
    return true;
}

function moveTransaction(sourceObjectId, targetObjectId, transactionId) {
    const sourceEnvelope = getEnvelopeById(sourceObjectId);
    const transactionIndex = getTransactionIndexById(sourceEnvelope, transactionId);
    const transaction = sourceEnvelope.transactions[transactionIndex];
    const uptadetedEnvelope = makeTransaction(targetObjectId, transaction);
    deleteTransactionById(sourceObjectId, transactionId)
    return uptadetedEnvelope;
}

module.exports = {
    addEnvelopeToDatabase,
    getEnvelopeById,
    getAllEnvelopes,
    deleteEnvelopeById,
    updateEnvelopeById,
    makeTransaction,
    deleteTransactionById,
    getTransactionIndexById,
    moveTransaction
};