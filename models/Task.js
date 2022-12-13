const mongoose = require ('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true , "Must Provide Name"],
        trim:true,
        maxlength:[20,"Name Can't be More Than 20 Characters"]
    } ,
    completed:{
        type:Boolean,
        default:false
    },
})
module.exports = mongoose.model('Task' , TaskSchema)