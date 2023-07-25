const asyncWrapper = (fn)=>{
    return async (req,res ,nxt)=>{
        try {
           await fn(req,res,nxt)
        } catch (error) {
            nxt(error)
        }
    }
}

module.exports = asyncWrapper