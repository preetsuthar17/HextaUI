type TrackProps = Record<string, string>

type Stonks = {
  event?: (name: string, path?: string, props?: TrackProps) => unknown
}

function track(name: string, props?: TrackProps) {
  try {
    const stonks = (window as unknown as { stonks?: Stonks }).stonks
    stonks?.event?.(name, window.location.pathname, props)
  } catch {}
}

export { track, type TrackProps }
