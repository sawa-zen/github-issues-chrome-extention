import { HeaderData } from "./main"

export const chipTestId = 'github-project-column-sum-chip'

export const createChip = (title: string, sum: number) => {
  const chip = document.createElement('div')
  chip.dataset.testId = `${chipTestId}-${title}`
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
  chip.innerText = `${title}: ${sum}`
  return chip
}

export const calcStorypointSum = (rows: NodeListOf<Element>, storypointHeaderIndex: number) => {
  let result = 0
  rows.forEach(row => {
    const currentValue = Number(row.childNodes[storypointHeaderIndex].textContent)
    result = result + currentValue
  })
  return result
}

export const renderChip = (tableGroup: Element, headerData: HeaderData) => {
  const header = tableGroup.querySelector('[data-test-id^="table-group-header"]')
  const rows = tableGroup.querySelectorAll('.hoverable[role="row"]')
  const sum = calcStorypointSum(rows, headerData.index)
  const chip = createChip(headerData.title, sum)

  if (!header) return

  const oldChip = header.querySelector(`[data-test-id="${chipTestId}-${headerData.title}"]`)
  if (oldChip) {
    header.removeChild(oldChip)
  }
  header.appendChild(chip)
}
