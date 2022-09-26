import { TagData } from "@topotal/topotal-ui"
import { chipTestId, renderChip } from "./chip"

export interface HeaderData {
  title: string
  index: number
}

const getTargetHeaderData = (tableRoot: Element, targetColumnNames: TagData[]) => {
  const header = tableRoot.querySelector("[class^=table-header]")
  const headerRow = header!.childNodes[0]

  const targetHeaderData: HeaderData[] = []
  targetColumnNames.forEach(({ value }) => {
    for (const [index, cell] of headerRow.childNodes.entries()) {
      const textContent = cell.textContent || ''
      if (textContent.includes(value)) {
        targetHeaderData.push({ title: value, index })
      }
    }
  })

  return targetHeaderData
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

const getTargetColumnNames = async () => {
  const columnNamesJSON = await chrome.storage.local.get('columnNames')
  const columnNames = JSON.parse(columnNamesJSON.columnNames || '[]') as TagData[]
  return columnNames
}

const clearChips = () => {
  const oldChips = document.querySelectorAll(`[data-test-id^="${chipTestId}"]`)
  oldChips.forEach(oldChip => oldChip.remove())
}

const render = async () => {
  const tableRoot = document.querySelector('[data-test-id^="table-root"]')
  const isBoardView = !tableRoot

  if (isBoardView) return

  const targetColumnNames = await getTargetColumnNames()
  if (targetColumnNames.length === 0) {
    clearChips()
    return
  }

  const targetHeaderData = getTargetHeaderData(tableRoot, targetColumnNames)
  if (targetHeaderData.length === 0) {
    clearChips()
    return
  }

  targetHeaderData.forEach((headerData) => {
    const tableGroups = getTableGroups()
    tableGroups.forEach(tableGroup => {
      renderChip(tableGroup, headerData)
    })
  })
}

const main = () => {
  setInterval(() => { render() }, 1000)
  render()
}

main()
