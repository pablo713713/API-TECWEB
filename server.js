const express = require('express'); // Asegúrate de que esté escrito correctamente
const cors = require('cors');
const morgan = require('morgan');
const { envelopesRouter, errorHandler } = require('./api/envelopes.js');
const app = express();

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/envelopes', envelopesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    const baseUrl = `http://localhost:${PORT}`; // Cambia 'localhost' por tu IP si es necesario
    console.log(`Server is listening on ${baseUrl}`);
});
