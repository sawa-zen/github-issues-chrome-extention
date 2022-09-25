import { Button, VStack, HStack, Text, InputField, useTheme, TagInput, TagData } from '@topotal/topotal-ui'
import { useCallback, useEffect, useState } from 'react'

const defaultValue: TagData[] = []

export const Popup = (): JSX.Element => {
  const { color } = useTheme()
  const [value, setValue] = useState<TagData[]>(defaultValue)

  useEffect(() => {
    chrome.storage.local.get(handleGetStorage)
  }, [])

  const handleGetStorage = useCallback((items: { [key: string]: any }) => {
    const newValue = JSON.parse(items.columnNames || '[]') as TagData[]
    setValue(newValue)
  }, [])

  const handleChangeColumnNames = useCallback(async (value: TagData[]) => {
    setValue(value)
    await chrome.storage.local.set({ columnNames: JSON.stringify(value) })
  }, [])

  return (
    <VStack
      style={{
        minWidth: 360,
        borderRadius: 8,
      }}
    >
      <HStack
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: color.primary,
        }}
      >
        <Text
          type="display1"
          weight="bold"
          style={{ color: color.primaryTextLight }}
        >
          GitHub Project Column Sum
        </Text>
      </HStack>
      <VStack
        style={{ padding: 16 }}
        gap={16}
      >
        <InputField
          title='Column Names'
          style={{ zIndex: 2 }}
        >
          <TagInput
            value={value}
            onChange={handleChangeColumnNames}
          />
        </InputField>
      </VStack>
    </VStack>
  )
}
