export const Follow = (userId)=>({
    type:"FOLLOW",
    payload:userId
})
export const unFollow = (userId)=>({
    type:"UNFOLLOW",
    payload:userId
})