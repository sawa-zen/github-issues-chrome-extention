
(() => {
	const getStorypointHeaderData = () => {
		const headers = document.querySelectorAll('[data-is-header="true"]')
		for (const [index, header] of headers.entries()) {
			if (header.textContent.includes('Storypoint')) {
				return {
					element: header,
					index: index
				}
			}
		}
	}

	const getTableGroups = () => {
		const elements = document.querySelectorAll('[data-test-id^="table-group-"]')
		const result = []
		elements.forEach(element => {
			console.info(element.getAttribute('data-test-id'))
			const testId = element.getAttribute('data-test-id')
			if (testId.includes('table-group-header') || testId.includes('table-group-footer') || testId.includes('table-group-name')) {
				return
			}
			result.push(element)
		})
		return result
	}


	const storypointHeaderData = getStorypointHeaderData()
	
	if (storypointHeaderData === undefined) return

	console.info(getTableGroups())
	console.info(storypointHeaderData)

})()