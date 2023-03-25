import { Blocks } from 'react-loader-spinner';

export default function Loading() {
	return (
		<div className="fixed top-0 left-0 w-full h-full block pointer-events-none">
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4">
				<Blocks
					visible={true}
					height="80"
					width="80"
					ariaLabel="blocks-loading"
					wrapperStyle={{}}
					wrapperClass="blocks-wrapper"
				/>
			</div>
		</div>
	);
}
