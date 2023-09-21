import { useState, useEffect, useCallback } from 'react'

type AnimationState = 'neutral' | 'exiting' | 'exited'

const useAnimationEnd = () => {

  const [node, setNode] = useState<HTMLElement | null>(null)
  const [state, setState] = useState<AnimationState>('neutral')

  const toggle = useCallback(() => {
    if (state === 'neutral') {
      setState('exiting')
    } else {
      setState('neutral')
    }
  }, [state])

  useEffect(() => {

    const event = () => {
      setState('exited')
    }

    node?.addEventListener('animationend', event)

    return () => {
      node?.addEventListener('animationend', event)
    }
  }, [node])

  return { setNode, state, toggle }
}

export default useAnimationEnd