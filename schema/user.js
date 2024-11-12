import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    complaintno :{type:String},
    name: { type: String },
  dob: { type: String },
  pan: { type: String},
  accountNumber: { type: String},
  ifsc: { type: String },
  phone: { type: String },
  password: { type: String },

  // Investment Details
  investedInMutualFund: { type: String,  },
  investedInEquityFund: { type: String, },
  consolidatedFundValue: { type: String, },
  commissionDue: { type: String,  },
  commissionRealised: { type: String,  },

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
