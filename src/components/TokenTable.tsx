import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { tokens } from '../constants';
import { TokenRecord } from '../types/token';
import like from '../assets/images/thumbs-up-outline.svg';
import liked from '../assets/images/thumbs-up.svg';

type TokenTableProps = {
	tokenPrices: TokenRecord;
	previousPrices: TokenRecord;
	likedList: string[];
	onClickLikeToken: (tokenName: string) => void;
};

export const TokenTable = ({ tokenPrices, previousPrices, likedList, onClickLikeToken }: TokenTableProps) => {
	const [data, setData] = useState<any>([]);

	const getSign = (number: BigNumber) => {
		if (number.gt(BigNumber.from(0))) {
			return 'positive';
		} else if (number.lt(BigNumber.from(0))) {
			return 'negative';
		}
		return 'neutral';
	};

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

			return { percent: formatUnits(percentChanged, 28) + '%', sign: getSign(percentChanged) };
		},
		[tokenPrices, previousPrices],
	);

	useEffect(() => {
		const _data = tokens.map((token) => {
			const percent = getPercentChanged(token.name);
			return {
				name: token.name,
				liked: likedList.includes(token.name),
				price: getPrice(token.name),
				percentChanged: percent.percent,
				sign: percent.sign,
			};
		});

		setData(_data);
	}, [likedList, getPrice, getPercentChanged]);

	return (
		<div className='w-full px-16 overflow-scroll'>
			<table className='border-separate border-spacing-1 border table-auto'>
				<thead className='bg-gray'>
					<tr>
						<th className='w-1/12'>ACTION</th>
						<th className='w-1/12'>TOKEN</th>
						<th className='w-3/12'>PRICE</th>
						<th className='w-7/12'>%CHANGE</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((token: any) => (
							<tr key={token.name}>
								<td className='flex justify-center'>
									<button onClick={() => onClickLikeToken(token.name)}>
										{token.liked ? (
											<img className='w-8' src={liked} alt='liked' />
										) : (
											<img className='w-8' src={like} alt='like' />
										)}
									</button>
								</td>
								<td className='text-center'>{token.name}</td>
								<td className='text-right'>{token.price}</td>
								<td
									className={`text-right${token.sign === 'positive' ? ' text-green' : ''}${
										token.sign === 'negative' ? ' text-red' : ''
									}`}
								>
									{token.percentChanged}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};
