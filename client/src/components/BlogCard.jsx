import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({cover, title, name, date, }) => {
    
    const formatDate = (d) =>{
        const date = new Date(d);
        const publishedDate = date.toLocaleString('en-US',{month:'2-digit',year:'numeric', day:'2-digit'})
        return `${publishedDate}`
    }

    return (
        <Link to='/blog/mernstackmastery'><div className='rounded-xl bg-neutral-200 drop-shadow-lg h-full p-4'>
            <div className='h-72'>
                <img className='rounded-xl w-full h-full' src={cover}></img>
            </div>
            <div className='py-2'>
                <button className='rounded-full px-4 py-2 bg-zinc-800 text-white'>Technology</button>
                <h1 className='text-xl mt-2 font-semibold'>{title}</h1>
                <div className='mt-4 flex items-center gap-4 rounded-lg px-4 py-4 bg-zinc-800 text-white'>
                    <div>
                        <h1>Author : {name}</h1>
                        <p>Published on {formatDate(date)}</p>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default BlogCard
