const mongoose = require("mongoose");

const messageModel = mongoose.Schema({
    sender :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    chat:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    content: { // Add content field
        type: String,
        required: true // Adjust as needed
    }

},
{
    timeStamp:true,
}
);

const Message = mongoose.model("Message",messageModel);
module.exports = Message;