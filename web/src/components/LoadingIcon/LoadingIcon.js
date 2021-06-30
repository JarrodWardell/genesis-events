const LoadingIcon = ({ size = 12, animated = true }) => {
  return (
    <div className={`flex w-${size} h-${size} justify-self-center self-center`}>
      <img className="w-auto animate-pulse" src="/Logo.png" alt="Loading" />
    </div>
  )
}

export default LoadingIcon
