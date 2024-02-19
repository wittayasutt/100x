import { BigNumber } from '@ethersproject/bignumber';
import { PriceFeed } from '@pythnetwork/pyth-evm-js';
import { IToken } from '../constants';
import { TokenReport } from '../types/token';

// TODO: Please add unit test to all functions in this file

export const getMatchedTokenName = (tokens: IToken[], feed: PriceFeed): string => {
	return tokens.find((t) => t.priceId.toLowerCase() === '0x'.concat(feed.id))!.name;
};

export const parsePriceToIPythPrice = (priceFeed: PriceFeed) => {
	const priceUnchecked = priceFeed.getPriceUnchecked();

	const price = BigNumber.from(priceUnchecked.price);
	const expoToE30 = BigNumber.from(10).pow(30 + priceUnchecked.expo);

	return price.mul(expoToE30);
};

export const getHighestTokenPrice = ({ tokens, tokenPrices }: TokenReport): string => {
	return tokens.reduce<string>((currentHighest, comparison) => {
		if (currentHighest === 'X') return comparison;

		const currentHighestPrice = tokenPrices[currentHighest];
		const comparisonPrice = tokenPrices[comparison];

		if (!comparisonPrice) return currentHighest;
		return currentHighestPrice.gt(comparisonPrice) ? currentHighest : comparison;
	}, 'X');
};

export const getLowestTokenPrice = ({ tokens, tokenPrices }: TokenReport): string => {
	return tokens.reduce<string>((currentLowest, comparison) => {
		if (currentLowest === 'X') return comparison;

		const currentLowestPrice = tokenPrices[currentLowest];
		const comparisonPrice = tokenPrices[comparison];

		if (!comparisonPrice) return currentLowest;
		return currentLowestPrice.lt(comparisonPrice) ? currentLowest : comparison;
	}, 'X');
};
