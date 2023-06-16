/** @jsx h */
import { h } from 'preact'
import { useState } from 'preact/hooks'
import { DateRangePicker, DateRangePickerValue } from '@tremor/react'

export default () => {
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(2022, 1, 1),
    new Date(),
  ])

  return (
    <DateRangePicker
      class='max-w-md'
      value={value}
      onValueChange={setValue}
    />
  )
}
