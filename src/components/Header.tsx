interface HeaderProps {
    title: string
    subtitle?: string
  }
  
  const Header = ({ title, subtitle }: HeaderProps) => {
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        {subtitle && <p className="text-text-secondary mt-1">{subtitle}</p>}
      </div>
    )
  }
  
  export default Header
  