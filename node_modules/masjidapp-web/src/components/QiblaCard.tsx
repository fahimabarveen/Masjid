import React from 'react'
import { motion } from 'framer-motion'

type LatLng = { lat: number; lng: number }

const KAABA: LatLng = { lat: 21.4225, lng: 39.8262 }

function toRadians(deg: number) {
  return (deg * Math.PI) / 180
}

function toDegrees(rad: number) {
  return (rad * 180) / Math.PI
}

function computeBearing(from: LatLng, to: LatLng): number {
  const φ1 = toRadians(from.lat)
  const φ2 = toRadians(to.lat)
  const Δλ = toRadians(to.lng - from.lng)
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  const θ = Math.atan2(y, x)
  const bearing = (toDegrees(θ) + 360) % 360
  return bearing
}

function cardinalFromDegrees(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const idx = Math.round(deg / 45) % 8
  return dirs[idx]
}

export function QiblaCard() {
  const [location, setLocation] = React.useState<LatLng | null>(null)
  const [deviceHeading, setDeviceHeading] = React.useState<number>(0)
  const [needsPermission, setNeedsPermission] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  // Acquire location once
  React.useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      },
      () => setError('Location unavailable')
    )
  }, [])

  // Listen to device orientation (heading)
  const enableCompass = React.useCallback(async () => {
    try {
      const anyDOE = (window as any).DeviceOrientationEvent
      if (anyDOE && typeof anyDOE.requestPermission === 'function') {
        const resp = await anyDOE.requestPermission()
        if (resp !== 'granted') {
          setNeedsPermission(true)
          return
        }
      }
      setNeedsPermission(false)
    } catch {
      // ignore
    }
  }, [])

  React.useEffect(() => {
    const handle = (e: DeviceOrientationEvent) => {
      // On many devices alpha is 0 at North, increasing clockwise
      let alpha = (e.alpha ?? 0)
      // Some platforms provide webkitCompassHeading (iOS Safari)
      const anyEvent = e as any
      if (typeof anyEvent.webkitCompassHeading === 'number') {
        alpha = anyEvent.webkitCompassHeading
      }
      setDeviceHeading((alpha + 360) % 360)
    }
    const attach = async () => {
      const anyDOE = (window as any).DeviceOrientationEvent
      if (anyDOE && typeof anyDOE.requestPermission === 'function') {
        setNeedsPermission(true)
      }
      window.addEventListener('deviceorientation', handle, true)
    }
    attach()
    return () => window.removeEventListener('deviceorientation', handle, true)
  }, [])

  const bearing = React.useMemo(() => {
    if (!location) return null
    return computeBearing(location, KAABA)
  }, [location])

  const relative = bearing == null ? 0 : (bearing - deviceHeading + 360) % 360

  const degreeText = bearing == null ? '—' : `${Math.round(bearing)}° ${cardinalFromDegrees(bearing)}`
  const mapsHref = location
    ? `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${KAABA.lat},${KAABA.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${KAABA.lat},${KAABA.lng}`

  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-xl bg-white/70 dark:bg-black/30 p-4 shadow backdrop-blur">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">Qibla Direction</div>
        <a className="text-secondary hover:underline text-sm" href={mapsHref} target="_blank" rel="noreferrer">Open in Maps</a>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          {/* Compass ring */}
          <div className="absolute inset-0 rounded-full border-4 border-secondary/40" />
          <div className="absolute inset-2 rounded-full border-2 border-secondary/30" />
          {/* North mark */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-xs">N</div>
          {/* Qibla needle */}
          <div
            className="absolute left-1/2 top-1/2 h-16 w-2 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${relative}deg)` }}
          >
            <div className="h-full w-full origin-bottom bg-secondary rounded-t-full" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-secondary" />
          </div>
          {/* Kaaba dot */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">Kaaba</div>
        </div>
        <div className="mt-3 text-secondary font-extrabold text-xl">{degreeText}</div>
        <div className="text-xs opacity-80 mt-1 text-center">
          Hold your phone flat and rotate until the green arrow points to Qibla
        </div>
        {needsPermission && (
          <button onClick={enableCompass} className="mt-3 rounded bg-secondary text-light px-3 py-2 hover:bg-primary text-sm">Enable Compass</button>
        )}
        {error && <div className="text-xs text-red-700 mt-2">{error}</div>}
      </div>
    </motion.div>
  )
}


