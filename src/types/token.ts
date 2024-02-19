import { BigNumber } from 'ethers';

export type TokenReport = {
	tokens: string[];
	tokenPrices: Record<string, BigNumber>;
};
