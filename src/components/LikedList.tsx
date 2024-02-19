type LikedListProp = { tokens: string[] };

export const LikedList = ({ tokens }: LikedListProp) => {
	return (
		<div className='p-2'>
			<div className='mb-2'>
				<strong>Your liked TOKENs !!</strong>
			</div>
			<div className='flex flex-col gap-2'>
				{tokens.map((token) => (
					<div key={token}>{token}</div>
				))}
			</div>
		</div>
	);
};
