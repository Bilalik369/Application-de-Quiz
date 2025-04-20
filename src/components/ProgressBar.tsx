interface ProgressBarProps {
    value: number
  }
  
  const ProgressBar = ({ value }: ProgressBarProps) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300 ease-in-out"
          style={{ width: `${value}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    )
  }
  
  export default ProgressBar
  