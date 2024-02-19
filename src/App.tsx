import { useState } from 'react';
import { useSubPythPrices } from './hooks/useSubPythPrices';
import { TokenTable } from 'components/TokenTable';
import { LikedList } from 'components/LikedList';
import { LikedTokenReport } from 'components/LikedTokenReport';
import { tokens } from './constants';

function App() {
	const [likedList, setLikedList] = useState<string[]>([]);
	const { priceFeed, previousPriceFeed } = useSubPythPrices();

	const handleToggleLikedList = (tokenName: string) => {
		let newLikedList = likedList;
		if (likedList.some((likedToken) => likedToken === tokenName)) {
			newLikedList = newLikedList.filter((likedToken) => likedToken !== tokenName);
		} else {
			newLikedList = [...newLikedList, tokenName];
		}

		setLikedList(newLikedList);
	};

	return (
		<div className='flex flex-col justify-center items-center mx-auto'>
			<div className='mb-16 text-center'>
				<header className='text-[4rem]'>Token prices from {tokens.length} tokens</header>
				<LikedTokenReport tokens={likedList} tokenPrices={priceFeed} />
			</div>
			<div className='w-full flex items-start gap-2'>
				<TokenTable
					tokenPrices={priceFeed}
					previousPrices={previousPriceFeed}
					likedList={likedList}
					onClickLikeToken={handleToggleLikedList}
				/>
				<LikedList tokens={likedList} />
			</div>
		</div>
	);
}

export default App;
