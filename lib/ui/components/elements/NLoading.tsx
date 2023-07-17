export interface NLoading {
  children?: preact.ComponentChildren
}

export function NLoading(props: NLoading) {
  return (
    <div class='n-loading n-panel-grids-center'>
      <div class='flex flex-col animate-pulse items-center text-lg'>
        <div class='mdi-dots-circle animate-spin text-4xl op50' />
        <slot>
          {props.children ?? 'Loading...'}
        </slot>
      </div>
    </div>
  )
}
