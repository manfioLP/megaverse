import express from 'express';

// IMPORT dotenv
import dotenv from 'dotenv';
import handlers from './src/handlers';

const app = express();
const port = 3000;

dotenv.config();

app.get('/', (req, res) => {
	res.send({ok: true, status: 'Server running'});
});

app.post('/astral-object', handlers.createAstralObject);

app.delete('/astral-object', handlers.removeAstralObject);
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
