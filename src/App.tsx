import { Button, VStack, TextInput, HStack, Text, useTheme, TagInput } from '@topotal/topotal-ui'

export const App = (): JSX.Element => {
  const { color } = useTheme()

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
          GitHub Project Summing Calculator
        </Text>
      </HStack>
      <VStack
        style={{ padding: 16 }}
        gap={16}
      >
        <TagInput />
        <Button
          title="Save"
          color="success"
          size='medium'
        />
      </VStack>
    </VStack>
  )
}
