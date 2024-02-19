import { useMemo } from 'react';
import { getHighestTokenPrice, getLowestTokenPrice } from '../helpers/token';
import { TokenReport } from '../types/token';

export const LikedTokenReport = ({ tokens, tokenPrices }: TokenReport) => {
	const highestToken = useMemo(() => getHighestTokenPrice({ tokens, tokenPrices }), [tokens, tokenPrices]);
	const LowestToken = useMemo(() => getLowestTokenPrice({ tokens, tokenPrices }), [tokens, tokenPrices]);

	return (
		<div className='flex'>
			<div className='font-bold'>HIGHEST Price liked TOKEN: {highestToken}</div>
			<div className='mx-0.5'>||||||||</div>
			<div className='font-bold'>LOWEST Price liked TOKEN: {LowestToken}</div>
		</div>
	);
};
