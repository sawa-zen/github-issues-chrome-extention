
(() => {
	const getStorypointHeaderData = () => {
		const headers = document.querySelectorAll('[data-is-header="true"]')
		for (const [index, header] of headers.entries()) {
			if (header.textContent.includes('Story Point')) {
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
			const testId = element.getAttribute('data-test-id')
			if (
				testId.includes('table-group-header') ||
				testId.includes('table-group-footer') ||
				testId.includes('table-group-name')
			) {
				return
			}
			result.push(element)
		})
		return result
	}

  const getRows = (tableGroup) => {
    return tableGroup.querySelectorAll('.hoverable[role="row"]')
  }

  const calcStorypointSum = (rows, storypointHeaderIndex) => {
    let result = 0
    rows.forEach(row => {
      result = result + Number(row.childNodes[storypointHeaderIndex + 1].textContent)
    })
    return result
  }

  const chipTestId = 'storypoints-sum-chip'

  const createChip = ({ sum }) => {
    const chip = document.createElement('div')
    chip.dataset.testId = chipTestId
    chip.style.backgroundColor = '#1765c1'
    chip.style.color = '#FFF'
    chip.style.fontSize = '12px'
    chip.style.lineHeight = '20px'
    chip.style.verticalAlign = 'center'
    chip.style.textAlign = 'center'
    chip.style.borderRadius = '10px'
    chip.style.height = '20px'
    chip.style.padding = '0px 8px'
    chip.style.marginLeft = '16px'
    chip.innerText = `Storypoints: ${sum}`
    return chip
  }

	const renderStorypointsSum = (tableGroup, storypointHeaderIndex) => {
    const header = tableGroup.querySelector('[data-test-id^="table-group-header"]')
    const rows = getRows(tableGroup)
    const sum = calcStorypointSum(rows, storypointHeaderIndex)
    const chip = createChip({ sum })
    const oldChip = header.querySelector(`[data-test-id="${chipTestId}"]`)
    if (oldChip) {
      header.removeChild(oldChip)
    }
    header.appendChild(chip)
	}

  const render = () => {
    const storypointHeaderData = getStorypointHeaderData()
    if (storypointHeaderData === undefined) return

    const { index: storypointHeaderIndex } = storypointHeaderData
    const tableGroups = getTableGroups()
    tableGroups.forEach(tableGroup => {
      renderStorypointsSum(tableGroup, storypointHeaderIndex)
    })
  }

  const main = () => {
    setInterval(() => { render() }, 1000)
    render()
  }

  main()
})()
