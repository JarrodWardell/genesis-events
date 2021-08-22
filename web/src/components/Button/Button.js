const Button = ({
  type = 'button',
  onClick,
  children,
  disabled = false,
  loading = false,
  full = true,
  className = '',
  color = 'green',
  my = '8',
  py = 2,
  px = 4,
  colorWeight = 700,
}) => {
  return (
    <button
      type={type}
      className={`my-${my} flex justify-center py-${py} px-${px} border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${className} bg-${color}-${colorWeight} focus:ring-${color}-${
        colorWeight - 200
      } ${
        disabled
          ? 'bg-opacity-50 cursor-not-allowed'
          : `hover:bg-${color}-${colorWeight + 200}`
      } ${full ? 'w-full' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
