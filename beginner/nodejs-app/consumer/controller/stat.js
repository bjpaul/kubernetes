// Import stat model
Schema = require('../model/stat');


// Handle update contact info
exports.update = function (action) {
    Schema.Stat.findOne({}, function (err, stat) {
        if (err) {
            console.log(err)
        }else{
            if(stat == null){
                stat = new Schema.Stat();
                stat.createEvent = 0;
                stat.updateEvent = 0;
                stat.deleteEvent = 0;
            }
            if (action === "create") {
                stat.createEvent = (Number(stat.createEvent)?Number(stat.createEvent):0) + 1
            }else if(action === "update"){
                stat.updateEvent = (Number(stat.updateEvent)?Number(stat.updateEvent):0) + 1
            }else if(action === "delete"){
                stat.deleteEvent = (Number(stat.deleteEvent)?Number(stat.deleteEvent):0)+ 1
            }
                // save the contact and check for errors
            stat.save(function (err) {
                if (err) {
                    console.log(err)
                }else{
                    console.log("Updated into DB")
                }
            });
        }
    });
};