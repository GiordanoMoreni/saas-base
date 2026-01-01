export default function BillingLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-32 bg-gray-200 rounded-lg animate-pulse" />
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}

