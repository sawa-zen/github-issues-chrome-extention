import { useState } from 'react'
import { Button, VStack, TextInput } from '@topotal/topotal-ui'

export const App = (): JSX.Element => {
  const [count, setCount] = useState(0)

  return (
    <VStack
      style={{
        padding: 24,
        minWidth: 300,
        borderRadius: 8,
      }}
      gap={16}
    >
      <TextInput size='medium' />
      <Button
        title="Save"
        color="success"
        size='medium'
      />
    </VStack>
  )
}
