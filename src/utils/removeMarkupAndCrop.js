function removeMarkupAndCrop(input) {
	return (
		input &&
		input
			.replace(/<[^>]*>?/gm, '')
			.slice(0, 50)
			.concat('...')
	);
}

export default removeMarkupAndCrop;
