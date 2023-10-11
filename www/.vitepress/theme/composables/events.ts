export function useEvents() {
  const EVENTS_FATHOM = {
    videoPlay: 'YIWKIXJB',
  }

  const trackVideoPlay = () => {
    window.fathom.trackGoal(EVENTS_FATHOM.videoPlay, 0)
    // window.anotherServiceHere...
  }

  return {
    EVENTS_FATHOM,
    trackVideoPlay,
  }
}
