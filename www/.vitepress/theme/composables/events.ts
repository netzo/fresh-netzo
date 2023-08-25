export function useEvents() {
  const EVENTS_FATHOM = {
    videoPlay: 'YIWKIXJB',
  }
  const EVENTS_CUSTOMERLY = {
    videoPlay: '',
  }

  const trackVideoPlay = () => {
    window.fathom.trackGoal(EVENTS_FATHOM.videoPlay, 0)
    // window.customerly...
  }

  return {
    EVENTS_FATHOM,
    EVENTS_CUSTOMERLY,
    trackVideoPlay,
  }
}
