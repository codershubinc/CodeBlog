import React, { useId } from 'react'


const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {

    const id = useId()

    return (
        <div className='w-full px-5 flex flex-col '>
            {label &&
                <label
                    htmlFor={id}
                    id={id}
                    className='text-left text-3xl font-semibold '
                >
                    {label}
                </label>
            }

            <input
                ref={ref}
                type={type}
                className={`w-full border-solid border-2 border-gray-700 p-1 rounded-2xl ${className}`}
                {...props}
                id={id}
            />
        </div>
    )


})

export default Input
