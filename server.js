const express = require('express'); // Asegúrate de que esté escrito correctamente
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4001;

const envelopesRouter = require('./api/envelopes.js');
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/envelopes', envelopesRouter);



app.listen(PORT, () => {
    const baseUrl = `http://192.168.3.11:${PORT}`; // Cambia 'localhost' por tu IP si es necesario
    console.log(`Server is listening on ${baseUrl}`);
});
