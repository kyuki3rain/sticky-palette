import { Blocks } from 'react-loader-spinner';

export default function Loading() {
	return (
		<div className="fixed top-0 left-0 w-full h-full block bg-black opacity-50 pointer-events-none">
			<Blocks
				visible={true}
				height="80"
				width="80"
				ariaLabel="blocks-loading"
				wrapperStyle={{}}
				wrapperClass="blocks-wrapper"
			/>
		</div>
	);
}
