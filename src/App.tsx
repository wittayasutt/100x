import { useState } from 'react';
import { useSubPythPrices } from './hooks/useSubPythPrices';
import { TokenTable } from 'components/TokenTable';
import { LikedList } from 'components/LikedList';
import { LikedTokenReport } from 'components/LikedTokenReport';
import { tokens } from './constants';

function App() {
	const [likedList, setLikedList] = useState<string[]>([]);
	const [tokenPrices, previousTokenPrices] = useSubPythPrices();

	return (
		<div className='flex flex-col justify-center items-center mx-auto'>
			<div className='mb-16 text-center'>
				<header className='text-[4rem]'>Token prices from {tokens.length} tokens</header>
				<LikedTokenReport likedTokens={likedList} tokenPrices={tokenPrices} />
			</div>
			<div className='w-full flex items-start gap-2'>
				<TokenTable tokenPrices={tokenPrices} previousPrices={previousTokenPrices} onChange={setLikedList} />
				<LikedList tokens={likedList} />
			</div>
		</div>
	);
}

export default App;
