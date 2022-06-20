import { Schema } from "mongoose";
var firstSchema = new Schema(
    {                                                                   //checks uper/lower condition
    name: { type: String, uppercase:true },
    email: { type: String, required:true, unique:true },
    address:{type:String,required:true},
    mobile: { type:String },
    password: { type: String}
  },

  );
  export default model("project", firstSchema);


