import { BigNumber } from 'ethers';

export type TokenRecord = Record<string, BigNumber>;

export type TokenReport = {
	tokens: string[];
	tokenPrices: TokenRecord;
};
