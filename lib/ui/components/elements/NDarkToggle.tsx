import { NSwitch, NSwitchProps } from '../mod.ts'
import { useTheme } from 'netzo/composables/browser/useTheme.ts'

export interface NDarkToggleProps extends NSwitchProps {
  checked?: boolean
}

export const NDarkToggle = (props: NDarkToggleProps) => {
  const theme = props.checked === true
    ? 'dark'
    : props.checked === false
    ? 'light'
    : undefined
  const { isDark } = useTheme(theme)

  const onClick = () => {
    isDark.value = !isDark.value
  }

  return (
    <NSwitch checked={isDark.value} onClick={onClick}>
      {isDark.value ? 'Dark' : 'Light'}
    </NSwitch>
  )
}
