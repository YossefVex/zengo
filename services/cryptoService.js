import axios from 'axios';

const config = {
	headers: {
		authorization: `Apikey ${process.env.CRYPTOCOMPARE_KEY}`
	}
};
const toTimestamp = (strDate) => {
	var datum = Date.parse(strDate);
	return datum / 1000;
};

const getCryptoPriceByDate = async (wantedDate, coinsList, currency) => {
	try {
		const validDate = new Date(wantedDate).getTime() > 0;
		if (!validDate) throw new Error('Bad Date attribute');

		const wantedTimestamp = toTimestamp(wantedDate);
		if (coinsList && wantedTimestamp) {
			const promisesArray = [];
			coinsList.forEach((coin) => {
				const query = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coin}&tsyms=${currency}&ts=${wantedTimestamp}`;
				promisesArray.push(axios.get(query, config));
			});
			const promisesArrayRes = await Promise.allSettled(promisesArray);
			const res = Object.assign({}, ...promisesArrayRes.map((pr) => pr.value.data));
			return res;
		}
	} catch (e) {
		throw new Error(e);
	}
};

export { getCryptoPriceByDate };
