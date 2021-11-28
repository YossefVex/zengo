import express from 'express';
import * as cryptoController from '../controllers/crypto.js';
const cryptoRouter = express.Router();

cryptoRouter.route('/compare').get(async (req, res) => {
	if (req?.query) {
		let { wantedDate, coinsList } = req.query;
		if (wantedDate && coinsList) {
			 wantedDate = '01/01/2020';
			 coinsList = 'BTC, ETH, BNB, DOGE';
			const compareList = await cryptoController.compareByDate(wantedDate, coinsList);
			res.send(200, compareList);
		}
	}
});

export default cryptoRouter;
