// activityController.js

const Activity = require('../model/ActivityModel');
const User = require('../model/UserModel');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

exports.addActivity = async (req, res) => {
   let activity = await Activity.findOne({activityName:req.body.activityName})
   if(activity){
    return res.status(400).json({error:"activity already added,would you like to resume?"})
   }
        let activityToAdd = new Activity({
            activityName: req.body.activityName,
            description: req.body.description,
            user:req.body.userId
        });

        // Save the activity to the database

         activityToAdd = await activityToAdd.save();
        if(!activityToAdd){
            return res.status(400).json({error:"something went wrong"})
        }
         return res.status(200).json({success:"activity added successfully"});
        //  console.log(activityToAdd)
   
};

//list out all activities
 exports.getAllActivities = async (req,res)=>{
    let activities = await Activity.find();
    if(!activities){
        return res.status(400).json({error:"something went wrong"})
    }
    return res.send(activities)
 };
