const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const activitySchema = new mongoose.Schema({
    activityName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:' '
    },
    startedAt:{
        type:Date,
        default:Date.now()
    },
    enddedAt:{
        type:Date
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    totalTime:{
        type:Number,
        
    },
    tags:{
        type:[String]
    },
    status:{
        type:String,
        enum:['in progress','completed','pending'],
        default:'in progress'
    }
},{timestamps:true})

module.exports = mongoose.model('Activity',activitySchema)