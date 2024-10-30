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
}

function getEnvelopeById(id) {
    return envelopesObjects.find(envelope => envelope.id === id);
}

function getAllEnvelopes() {
    return envelopesObjects;
}