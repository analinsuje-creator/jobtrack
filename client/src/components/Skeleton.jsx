import './Skeleton.css'

// A generic shimmering placeholder block — pass width/height/radius as needed
export function SkeletonBlock({ width = '100%', height = '16px', radius = '6px' }) {
  return <div className="skeleton-block" style={{ width, height, borderRadius: radius }} />
}

// Pre-built skeleton for a stat card
export function SkeletonStatCard() {
  return (
    <div className="stat-card">
      <SkeletonBlock width="48px" height="48px" radius="10px" />
      <div style={{ flex: 1 }}>
        <SkeletonBlock width="50%" height="22px" />
        <div style={{ marginTop: '8px' }}>
          <SkeletonBlock width="70%" height="12px" />
        </div>
      </div>
    </div>
  )
}

// Pre-built skeleton for a table/card row
export function SkeletonRow() {
  return (
    <div style={{ display: 'flex', gap: '16px', padding: '14px 16px', alignItems: 'center' }}>
      <SkeletonBlock width="20%" />
      <SkeletonBlock width="25%" />
      <SkeletonBlock width="15%" />
      <SkeletonBlock width="15%" />
      <SkeletonBlock width="10%" />
    </div>
  )
}