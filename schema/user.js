import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    complaintno :{type:String},
    name: { type: String, required: true },
  dob: { type: String, required: true },
  pan: { type: String, required: true ,},
  accountNumber: { type: String, required: true},
  ifsc: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true,unique:true },

  // Investment Details
  investedInMutualFund: { type: Number,  },
  investedInEquityFund: { type: Number, },
  consolidatedFundValue: { type: Number, },
  commissionDue: { type: Number,  },
  commissionRealised: { type: Number,  },

  // Assigned Officer
  assignedOfficerName: { type: String,  },
  assignedOfficerMobile: { type: String, },

  // Status
  status: { type: String, default: 'Pending' }, // Adjust default status as needed

  // Timestamps (optional)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
const User = mongoose.model("user",userSchema)
export default User;