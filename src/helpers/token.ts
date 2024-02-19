import { BigNumber } from '@ethersproject/bignumber';
import { PriceFeed } from '@pythnetwork/pyth-evm-js';
import { IToken } from '../constants';

export const getMacthedTokenName = (tokens: IToken[], feed: PriceFeed): string => {
	return tokens.find((t) => t.priceId.toLowerCase() === '0x'.concat(feed.id))!.name;
};

export const parsePriceToIPythPrice = (priceFeed: PriceFeed) => {
	const priceUnchecked = priceFeed.getPriceUnchecked();

	const price = BigNumber.from(priceUnchecked.price);
	const expoToE30 = BigNumber.from(10).pow(30 + priceUnchecked.expo);

	return price.mul(expoToE30);
};
