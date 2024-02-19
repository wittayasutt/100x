export const LikedList = ({ tokens }: { tokens: string[] }) => {
	// console.log('render liked list');
	return (
		<div className='p-2'>
			<div className='mb-2'>
				<strong>Your liked TOKENs !!</strong>
			</div>
			<div className='flex flex-col gap-2'>
				{tokens.map((t) => (
					<div key={t}>{t}</div>
				))}
			</div>
		</div>
	);
};
