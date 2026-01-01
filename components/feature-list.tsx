interface FeatureListProps {
  features: string[]
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="space-y-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center text-sm">
          <span className="text-green-600 mr-2">✓</span>
          <span className="text-gray-900">{feature}</span>
        </li>
      ))}
    </ul>
  )
}

