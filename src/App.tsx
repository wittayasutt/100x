import { useState } from 'react';
import { useSubPythPrices } from './hooks/useSubPythPrices';
import { TokenTable } from 'components/TokenTable';
import { LikedList } from 'components/LikedList';
import { LikedTokenReport } from 'components/LikedTokenReport';
import { tokens } from './constants';

function App() {
	const [likedList, setLikedList] = useState<string[]>([]);
	const { priceFeed, previousPriceFeed } = useSubPythPrices();

	return (
		<div className='flex flex-col justify-center items-center mx-auto'>
			<div className='mb-16 text-center'>
				<header className='text-[4rem]'>Token prices from {tokens.length} tokens</header>
				<LikedTokenReport tokens={likedList} tokenPrices={priceFeed} />
			</div>
			<div className='w-full flex items-start gap-2'>
				<TokenTable tokenPrices={priceFeed} previousPrices={previousPriceFeed} onChange={setLikedList} />
				<LikedList tokens={likedList} />
			</div>
		</div>
	);
}

export default App;
