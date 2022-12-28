import React from 'react'
import { TabTitle } from '../NewTab/GenerateTitle'

const Favorite = () => {
    TabTitle('Favorite')
    return (
        <div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="h-32 mt-6 rounded-xl">
                    <div class="grid grid-cols-3 text-center">
                        <div class="h-32 bg-red-300 rounded-l-xl">01</div>
                        <div class="col-span-2 bg-lime-400 rounded-r-xl text-left">02</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorite