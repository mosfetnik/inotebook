const mongoose = require('mongoose');
const userSchema = new Schema({
  tittle:{
   type: String,
   required:true,
  },
  descreption:{
   type: String,
   required:true,
  
  },
  tag:{
   type: String,
   default:"General"
  
  },
  date:{
   type: date,
   default:Date.now
  },

  
   
    
  });
  module.exports= mongoose.model('notes',NotesSchema);
  