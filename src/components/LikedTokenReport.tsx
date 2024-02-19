import { useMemo } from 'react';
import { getHighestTokenPrice, getLowestTokenPrice } from '../helpers/token';
import { TokenReport } from '../types/token';

export const LikedTokenReport = ({ tokens, tokenPrices }: TokenReport) => {
	const highestToken = useMemo(() => getHighestTokenPrice({ tokens, tokenPrices }), [tokens, tokenPrices]);
	const LowestToken = useMemo(() => getLowestTokenPrice({ tokens, tokenPrices }), [tokens, tokenPrices]);

	return (
		<div>
			<div>
				HIGHEST Price liked TOKEN: <span className='font-bold'>{highestToken}</span>
			</div>
			<div>
				LOWEST Price liked TOKEN: <span className='font-bold'>{LowestToken}</span>
			</div>
		</div>
	);
};
