import { TagData } from "@topotal/topotal-ui"
import { chipTestId, renderChip } from "./chip"

const getTargetHeaderData = (tableRoot: Element) => {
  const header = tableRoot.querySelector("[class^=table-header]")
  const headerRow = header!.childNodes[0]
  for (const [index, cell] of headerRow.childNodes.entries()) {
    const textContent = cell.textContent || ''
    if (textContent.includes('Story Point')) {
      return {
        element: cell,
        index: index
      }
    }
  }
}

const getTableGroups = () => {
  const elements = document.querySelectorAll('[data-test-id^="table-group-"]')
  const result: Element[] = []
  elements.forEach(element => {
    const testId = element.getAttribute('data-test-id')
    if (
      testId!.includes('table-group-header') ||
      testId!.includes('table-group-footer') ||
      testId!.includes('table-group-name')
    ) {
      return
    }
    result.push(element)
  })
  return result
}

const render = async () => {
  const columnNamesJSON = await chrome.storage.local.get('columnNames')
  const columnNames = JSON.parse(columnNamesJSON.columnNames || '[]') as TagData[]

  const tableRoot = document.querySelector('[data-test-id="table-root"]')

  const targetHeaderData = getTargetHeaderData(tableRoot!)
  if (targetHeaderData === undefined) {
    const oldChips = document.querySelectorAll(`[data-test-id="${chipTestId}"]`)
    oldChips.forEach(oldChip => oldChip.remove())
    return
  }

  const { index: storypointHeaderIndex } = targetHeaderData
  const tableGroups = getTableGroups()
  tableGroups.forEach(tableGroup => {
    renderChip(tableGroup, storypointHeaderIndex)
  })
}

const main = () => {
  setInterval(() => { render() }, 1000)
  render()
}

main()
