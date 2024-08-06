import React from 'react'

type Props = {
    onClick: () => void
    title: string
    color: string
}

const Button = ({ onClick, title, color }: Props) => {
    return (
        <button
            className="rounded-md p-4 sm:w-48 text-white sm:text-xl text-sm"
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button
