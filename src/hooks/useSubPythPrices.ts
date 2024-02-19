import { BigNumber } from '@ethersproject/bignumber';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';
import { useEffect, useState } from 'react';
import { tokens } from '../constants';
import { getMatchedTokenName, parsePriceToIPythPrice } from '../helpers/token';

type useSubPythPricesReturnType = {
	priceFeed: Record<string, BigNumber>;
	previousPriceFeed: Record<string, BigNumber>;
};

export const useSubPythPrices = (): useSubPythPricesReturnType => {
	const [previousPriceFeed, setPreviousPriceFeed] = useState<Record<string, BigNumber>>({});
	const [priceFeed, setPriceFeed] = useState<Record<string, BigNumber>>({});

	useEffect(() => {
		const connection = new EvmPriceServiceConnection('https://hermes.pyth.network');

		connection.subscribePriceFeedUpdates(
			tokens.map((t) => t.priceId),
			(feed) => {
				const tokenName = getMatchedTokenName(tokens, feed);
				const price = parsePriceToIPythPrice(feed);

				// TODO: check this feature again
				setPreviousPriceFeed((cur) => {
					const curTokenNam = cur[tokenName];
					if (curTokenNam?.gt(BigNumber.from(0))) {
						return cur;
					}

					return {
						...cur,
						[tokenName]: price,
					};
				});

				setPriceFeed((cur) => {
					return {
						...cur,
						[tokenName]: price,
					};
				});
			},
		);

		return () => {
			connection.closeWebSocket();
		};
	}, []);

	return { priceFeed, previousPriceFeed };
};
