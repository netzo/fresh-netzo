import { BadgeTrend } from './BadgeTrend.tsx'

interface Props {
  title: string
  trend: 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom'
  metric: string
}

export function CardKpi(props: Props) {
  return (
    <div class='block max-w-sm py-4 px-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      <div class='flex justify-between w-full'>
        <p class='font-normal text-gray-700 dark:text-gray-400'>
          {props.title}
        </p>
        <BadgeTrend trend={props.trend} />
      </div>
      <h5 class='mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {props.metric}
      </h5>
    </div>
  )
}
