import React from 'react'

const AdvistPage = () => {
    return (
        <div>
            <hr />
            <p className='uppercase text-[46px] font-bold'>advertisement</p>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mx-2'>
                <div>
                    <div className='mt-5 relative'>
                        <input
                            id='name'
                            name='name'
                            placeholder='Name'
                            type='text'
                            className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-amber-600'
                        />
                        <label for="name"
                            className='peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>Name</label>
                    </div>
                </div>
                <div>
                    <div className='mt-5 relative'>
                        <input
                            id='email'
                            name='email'
                            placeholder='Email Address'
                            type='text'
                            className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-amber-600'
                        />
                        <label for="email"
                            className='peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>Email Address</label>
                    </div>
                </div>
                <div>
                    <div className='mt-5 relative'>
                        <input
                            id='phone'
                            name='phone'
                            placeholder='Phone Number'
                            type='text'
                            className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-amber-600'
                        />
                        <label for="phone"
                            className='peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>Phone Number</label>
                    </div>
                </div>
                <div>
                    <div className='mt-5 relative'>
                        <input
                            id='links'
                            name='links'
                            placeholder='URL , Links'
                            type='text'
                            className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-amber-600'
                        />
                        <label for="links"
                            className='peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>URL , Links</label>
                    </div>
                </div>
            </div>
            <div className='mx-2'>
                <div className='mt-10 relative'>
                    <input
                        id='address'
                        name='address'
                        placeholder='Address'
                        type='text'
                        className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-amber-600'
                    />
                    <label for="address"
                        className='peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>Address</label>
                </div>
            </div>
            <div className='flex justify-center mt-10'>
                <button className='bg-amber-400 w-32 h-12 text-xl font-semibold rounded-2xl'>Pay</button>
            </div>

        </div>
    )
}

export default AdvistPage