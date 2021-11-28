import * as cryptoService from '../services/cryptoService.js';

const getDiffPercentage = (current, old) => {
	return ((current - old) / old) * 100;
};
const compareByDate = async (wantedDate, coinsList, currency = 'USD') => {
	try {
		const coinsArray = coinsList.replace(/ /g, '').split(',');
		const wantedDateRates = await cryptoService.getCryptoPriceByDate(wantedDate, coinsArray, currency);
		const todayTimestamp = new Date();
		const todayRates = await cryptoService.getCryptoPriceByDate(todayTimestamp, coinsArray, currency);
		const getRatesDefArray = coinsArray.map((coin) => {
			const wantedDatePrice = wantedDateRates[coin][currency];
			const currentPrice = todayRates[coin][currency];
			const diffPercentage = getDiffPercentage(currentPrice, wantedDatePrice)
			return { coin, diff: `${parseFloat(diffPercentage).toFixed(2)}%` };
		});

		return getRatesDefArray;
	} catch (e) {
		throw new Error(e);
	}
};

export { compareByDate };
