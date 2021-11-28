import express from 'express';
import cryptoRouter from './api/cryptoApi.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/crypto', cryptoRouter);

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
