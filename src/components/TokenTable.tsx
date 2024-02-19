import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { tokens } from '../constants';
import { TokenRecord } from '../types/token';

type TokenTableProps = {
	tokenPrices: TokenRecord;
	previousPrices: TokenRecord;
	likedList: string[];
	onClickLikeToken: (tokenName: string) => void;
};

export const TokenTable = ({ tokenPrices, previousPrices, likedList, onClickLikeToken }: TokenTableProps) => {
	const [data, setData] = useState<any>([]);

	const getPrice = useCallback(
		(tokenName: string) => {
			const price = tokenPrices[tokenName] ?? BigNumber.from(0);
			return formatUnits(price, 30);
		},
		[tokenPrices],
	);

	const getPercentChanged = useCallback(
		(tokenName: string) => {
			const price = tokenPrices[tokenName] ?? BigNumber.from(0);
			const previousPrice = previousPrices[tokenName] ?? BigNumber.from(0);
			const percentChanged = previousPrice.isZero()
				? BigNumber.from(0)
				: price.sub(previousPrice).mul(parseUnits('1', 30)).div(previousPrice);

			return formatUnits(percentChanged, 28) + '%';
		},
		[tokenPrices, previousPrices],
	);

	useEffect(() => {
		const _data = tokens.map((token) => {
			return {
				name: token.name,
				liked: likedList.includes(token.name),
				price: getPrice(token.name),
				percentChanged: getPercentChanged(token.name),
			};
		});

		setData(_data);
	}, [likedList, getPrice, getPercentChanged]);

	return (
		<div className='p-2 w-[70%]'>
			<table>
				<thead>
					<tr>
						<th>ACTION</th>
						<th>TOKEN</th>
						<th>PRICE</th>
						<th>%CHANGE</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((token: any) => (
							<tr key={token.name}>
								<td>
									<button onClick={() => onClickLikeToken(token.name)}>
										{token.liked ? 'Liked' : 'Like'}
									</button>
								</td>
								<td>{token.name}</td>
								<td className='text-right'>{token.price}</td>
								{/* todo: show red number when change is negative */}
								{/*       show green number when change is positive */}
								<td className='text-right'>{token.percentChanged}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};
