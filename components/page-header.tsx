interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p className="text-gray-600 mt-1">{description}</p>}
    </div>
  )
}

