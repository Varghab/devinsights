import React from 'react'

const Tag = ({filterHandler, label }) => {
    return (
        <div className={`${label?'block':'hidden'} flex gap-2 items-center`}>
            <input onChange={filterHandler} type="radio" name="tags" id={label} value={label} />
            <label className='text-lg font-light' htmlFor={label}>{label}</label>
        </div> 
    )
}

export default Tag
