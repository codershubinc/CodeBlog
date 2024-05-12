import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {

    const id = useId()
    return (
        <div className='w-full'>
            {label &&
                <label
                    htmlFor={id}
                    id={id}
                    className='text-left text-sm font-semibold text-white '
                >
                    {label}
                </label>
            }
            <select
                ref={ref}
                id={id}
                className={`w-full border-solid border-2 border-gray-700 p-1 rounded-2xl ${className}`}
                {...props}
            >
                {options &&
                    options.map((option) => (
                        <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>)

}

export default React.forwardRef(Select)
