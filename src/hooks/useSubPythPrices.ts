import { BigNumber } from '@ethersproject/bignumber';
import { EvmPriceServiceConnection, PriceFeed } from '@pythnetwork/pyth-evm-js';
import { useEffect, useState } from 'react';
import { tokens } from '../constants';
import { getMatchedTokenName, parsePriceToIPythPrice } from '../helpers/token';
import { TokenRecord } from '../types/token';

type useSubPythPricesReturnType = {
	priceFeed: TokenRecord;
	previousPriceFeed: TokenRecord;
};

export const useSubPythPrices = (): useSubPythPricesReturnType => {
	const [previousPriceFeed, setPreviousPriceFeed] = useState<TokenRecord>({});
	const [priceFeed, setPriceFeed] = useState<TokenRecord>({});

	const handleUpdateFeed = (feed: PriceFeed) => {
		const tokenName = getMatchedTokenName(tokens, feed);
		const price = parsePriceToIPythPrice(feed);

		setPreviousPriceFeed((cur) => {
			if (cur[tokenName]?.gt(BigNumber.from(0))) return cur;
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
	};

	useEffect(() => {
		const connection = new EvmPriceServiceConnection('https://hermes.pyth.network');

		const tokenPriceIds = tokens.map((t) => t.priceId);
		connection.subscribePriceFeedUpdates(tokenPriceIds, handleUpdateFeed);

		return () => {
			connection.closeWebSocket();
		};
	}, []);

	return { priceFeed, previousPriceFeed };
};
