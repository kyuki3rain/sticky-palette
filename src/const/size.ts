export const SIZE_TAGS = ['small', 'large'];

export const getSize = (size_tag: string) => {
	switch (size_tag) {
		case 'small':
			return { width: 256, height: 32, widthCSS: 'w-64', heightCSS: 'h-16' };
		case 'large':
			return { width: 256, height: 256, widthCSS: 'w-64', heightCSS: 'h-64' };
		default:
			return { width: 256, height: 32, widthCSS: 'w-64', heightCSS: 'h-16' };
	}
};
