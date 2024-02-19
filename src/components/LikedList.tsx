type LikedListProp = { tokens: string[] };

export const LikedList = ({ tokens }: LikedListProp) => {
	return (
		<div className='p-2'>
			<div className='mb-2'>
				<strong>Your liked TOKENs !!</strong>
			</div>
			<div className='w-full flex flex-wrap justify-center'>
				{tokens.map((token, index) => (
					<div key={token}>
						{index !== 0 && <span>,&nbsp;</span>}
						{token}
					</div>
				))}
			</div>
		</div>
	);
};
