import { JSX } from 'preact'
import { n } from '../../utils/mod.ts'

export interface NPanelGridsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children?: preact.ComponentChildren
}

export const NPanelGrids = (props: NPanelGridsProps) => {
  const ui = (extra?: string) => ({
    ...props,
    class: n(['n-panel-grids-center', props.class, extra]),
  })

  return (
    <div {...ui()}>
      {props.children}
    </div>
  )
}
