import { BigNumber } from '@ethersproject/bignumber';
import { tokens } from '../constants';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

type TokenTableProps = {
	tokenPrices: Record<string, BigNumber>;
	previousPrices: Record<string, BigNumber>;
	likedList: string[];
	onClickLikeToken: (tokenName: string) => void;
};

export const TokenTable = ({ tokenPrices, previousPrices, likedList, onClickLikeToken }: TokenTableProps) => {
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
					{tokens.map((token) => (
						<tr key={token.name}>
							<td>
								<button onClick={() => onClickLikeToken(token.name)}>
									{likedList.includes(token.name) ? 'Liked' : 'Like'}
								</button>
							</td>
							<td>{token.name}</td>
							<td className='text-right'>
								{(() => {
									const price =
										Object.entries(tokenPrices).find(([key]) => key === token.name)?.[1] ??
										BigNumber.from(0);

									return formatUnits(price, 30);
								})()}
							</td>
							{/* todo: show red number when change is negative */}
							{/*       show green number when change is positive */}
							<td className='text-right'>
								{(() => {
									const currentPrice =
										Object.entries(tokenPrices).find(([key]) => key === token.name)?.[1] ??
										BigNumber.from(0);

									const last24Price =
										Object.entries(previousPrices).find(([key]) => key === token.name)?.[1] ??
										BigNumber.from(0);

									const percentChanged = last24Price.isZero()
										? BigNumber.from(0)
										: currentPrice.sub(last24Price).mul(parseUnits('1', 30)).div(last24Price);

									return formatUnits(percentChanged, 28) + '%';
								})()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
