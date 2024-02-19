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
		<div className='flex flex-col justify-center items-center mx-auto bg-dark text-white'>
			<div className='mb-16 text-center'>
				<header className='text-[2rem] text-blue m-4'>Token prices from {tokens.length} tokens</header>
				<LikedTokenReport tokens={likedList} tokenPrices={priceFeed} />
				<hr className='my-4 text-blue' />
				<LikedList tokens={likedList} />
			</div>
			<TokenTable
				tokenPrices={priceFeed}
				previousPrices={previousPriceFeed}
				likedList={likedList}
				onClickLikeToken={handleToggleLikedList}
			/>
		</div>
	);
}

export default App;
