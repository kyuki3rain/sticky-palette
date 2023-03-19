export const COLOR_TAGS = [
	'gray',
	'red',
	'orange',
	'yellow',
	'lime',
	'emerald',
	'cyan',
	'blue',
	'purple',
	'pink',
];

export const getBGColor = (color: string) => {
	switch (color) {
		case 'gray':
			return 'bg-gray-200';
		case 'red':
			return 'bg-red-200';
		case 'orange':
			return 'bg-orange-200';
		case 'yellow':
			return 'bg-yellow-200';
		case 'lime':
			return 'bg-lime-200';
		case 'emerald':
			return 'bg-emerald-200';
		case 'cyan':
			return 'bg-cyan-200';
		case 'blue':
			return 'bg-blue-200';
		case 'purple':
			return 'bg-purple-200';
		case 'pink':
			return 'bg-pink-200';
		default:
			return 'bg-gray-200';
	}
};
