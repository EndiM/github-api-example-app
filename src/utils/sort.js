export default function sort(array, sortBy, order = 'DESC') {
	return array.sort((a, b) => {
		switch (order.toUpperCase()) {
			case 'ASC': {
				return a[sortBy] - b[sortBy];
			}
			case 'DESC': {
				return b[sortBy] - a[sortBy];
			}
			default: {
				return a[sortBy] - b[sortBy];
			}
		}
	});
}
