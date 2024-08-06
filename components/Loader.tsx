"use client"
import React from 'react'
import { Triangle } from 'react-loader-spinner'

type Props = {}

const Loader = (props: Props) => {
    return (
        <div className='w-full flex flex-row justify-center items-center'>
            <Triangle
                visible={true}
                height="200"
                width="200"
                color="#fff"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader
