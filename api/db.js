let envelopeId = 0;

const envelopesObjects = [
    createEnvelope({name: "Food", limit: 200}),
    createEnvelope({name: "Rent", limit: 1000}),
    createEnvelope({name: "Tools", limit: 500})
];

function generateId() {
    envelopeId++;
    return envelopeId;
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
        id: generateId()
    };
}

function addEnvelopeToDatabase(envelopeObject) {
    envelopesObjects.push(createEnvelope(envelopeObject));
    return envelopesObjects[envelopesObjects.length - 1];
}

function getEnvelopeById(id) {
    return envelopesObjects.find(envelope => envelope.id === id);
}

function getAllEnvelopes() {
    return envelopesObjects;
}

function deleteEnvelopeById(id) {
    const index = envelopesObjects.findIndex(envelope => envelope.id === id);
    if (index !== -1) {
        envelopesObjects.splice(index, 1);
        return true;
    } else {
        return false;
    }
}

function updateEnvelopeById(id, envelopeObject) {
    const index = envelopesObjects.findIndex(envelope => envelope.id === id);
    if (index !== -1) {
        envelopesObjects[index] = Object.assign(envelopesObjects[index], envelopeObject);
        return envelopesObjects[index];
    } else {
        return false;
    }
}

function makeTransaction(envelopeId, envelopeObject) {
    const envelope = getEnvelopeById(envelopeId);
    if (envelope) {
        envelope.transactions.push({
            date: new Date(),
            amount: envelopeObject.spent,
            description: envelopeObject.description
        });
        envelope.spent += envelopeObject.spent;
        return envelope;
    } else {
        return false;
    }
}

module.exports = {
    addEnvelopeToDatabase,
    getEnvelopeById,
    getAllEnvelopes,
    deleteEnvelopeById,
    updateEnvelopeById,
    makeTransaction
};