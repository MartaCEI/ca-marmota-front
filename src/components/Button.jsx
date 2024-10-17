export const Button = ({children, disabled, ...props}) => {
    // ...props es para aceptar cualquier otra prop como por ejemplo "onClick"
    return (
      <button 
      disabled={disabled?true:false} 
      className="bg-gray-500 hover:bg-orange-400 text-white font-bold py-1 px-2 rounded" {...props}>
        {children}
      </button>
    )
  }