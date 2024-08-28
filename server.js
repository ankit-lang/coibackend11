import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import mongoose from "mongoose"
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import User from "./schema/user.js";
import Admin from "./schema/admin.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
import dotenv from "dotenv"
dotenv.config()


const connectDb = async()=>{
 try {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, })
  console.log("database added")
 } catch (error) {
  console.log(error,"in Database")
 }
}
connectDb()

// app.post("/save", (req, res) => {
//   const { formData } = req.body;
//   let data = formData;
//   data = JSON.stringify(data);

//   if (typeof data !== "string") {
//     return res
//       .status(402)
//       .json({ message: "Invalid data type. Expected a string." });
//   }
//   const filePath = path.join(__dirname, "data", "client.txt");
//   if (!existsSync(filePath)) {
//     fs.mkdirSync(directoryPath, { recursive: true });
//   }
//   fs.appendFile(filePath, data, (err) => {
//     if (err) {
//       return res.status(500).json({ message: "Failed to save data" });
//     }
//     res.status(200).json({ message: "Data saved successfully" });
//   });
//   res.json({
//     message: "Data saved successfully",
//   });
// });



app.post("/save",async(req,res)=>{
  const {formData} = req.body;


  try {
      await   User.create(formData);
      res.status(201).json({
        success:true,
        message:"User created"
      })
    
  } catch (error) {
    console.log(error,"in createUser")
  }
  

})

//get details 
app.post("/client",async  (req, res) => {
 
  const { phone, password,name } = req.body;
  if (!phone || !password, !name) {
    return res.status(400).json({ message: "Some data is not provided" });
  }

   try {
    const user  = await User.findOne({phone,password})
    if(user){
     return  res.status(200).json({
        success:true,
        user,
        message:"User found"
      })
    }
     res.status(404).json({
      success:false,
      message:"User not found"
     })
   } catch (error) {
    console.log(error,"in client")
   }
 
{
  // const filePath = path.join(__dirname, "data", "client.txt");


  // if (existsSync(filePath)) {
    // const data = await fs.readFile(filePath, "utf8");
  //  

    // const records = data.trim().split(/(?<=})\s*(?={)/g);
 
  // 
    // let updated = false;
    // const updatedRecords = records.map((recordStr) => {
      // try {
        // const record = JSON.parse(recordStr);
      //  
  // 
        // Example check and update
        // if (record.phone == savedData.phone  ) { // Replace with actual phone value
          // updated = true;
        // 
          // return { ...savedData }; // Example update
        // }
  // 
        // return record;
      // } catch (parseError) {
        // console.error("Failed to parse record:", parseError);
        //  Return original record if parsing fails
      // }
    // });
  // 
    // if (!updated) {
      // console.log("No records were updated.");
      // return;
    // }
  // 
    // Write updated records back to the file
  //  
    // const updatedFileData = updatedRecords.map(record => JSON.stringify(record));
    // fs.writeFile(filePath, updatedFileData, 'utf8', (writeErr) => {
      // if (writeErr) {
        // console.error("Failed to write data:", writeErr);
        // return;
      // }
      // console.log("File updated successfully.");
    // });
  // }
}


});




//update client
app.post("/update", async (req, res) => {
    const {savedData} = req.body;
    const phone  = savedData.phone;
    const password = savedData.password;

       try {
        const user =  await  User.findOne({phone,password})
        if(!user) {
          return res.status(404).json({
            success:false,
            message:"User not found"
          })
        }
        Object.assign(user, savedData);
        await user.save()
          res.status(200).json({
            success:true,
            message:"user updated successfull"
          })
       } catch (error) {
         console.log(error,"in update")
       }


    {
  // const filePath = path.join(__dirname, "data", "client.txt");
  // if (existsSync(filePath)) {
    // const data = await fs.readFile(filePath, "utf8");

    // const jsonStrings = data.split("}{").map((str, index, arr) => {
      // Re-add the braces after splitting
      // if (index === 0) return str + "}";
      // if (index === arr.length - 1) return "{" + str;
      // return "{" + str + "}";
    // });

    // Parse each JSON string into an object
    // const jsonObjects = jsonStrings.map((jsonStr) => JSON.parse(jsonStr));
      // const foundObject  = jsonObjects.find(obj => obj.phone === phone && obj.password === password);
  // 
    // if (foundObject) {
      // return res.status(200).json(foundObject);
    // } else {
      // return res.status(404).json({ message: "Data not found" });
    // }
  // }
}
});


//count documents
app.get('/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    console.log(count)
    res.status(200).json({ success: true, count });
  } catch (error) {
    
  }
})



//admin
app.post('/admin', async (req, res) => {
  const {username,password} = req.body;
  try {
    const admin  = await Admin.findOne({username,password});
  if(admin){
    res.status(200).json({success:true  } )
  }
  else{
    res.status(404).json({message:"Invalid username or password"})
  }
  } catch (error) {
    console.log(error,"in admin")
  }
})
//update admin password
app.put('/editadmin', async (req, res) => {
    const {password,newpassword} = req.body;
    const username = "admin";
    try {
      const  admin = await Admin.findOne({username,password});
      if(admin){
        admin.password = newpassword;
        return res.status(200).json({
          success:true,
          message:"Password updated successfully"
        })
      }


    } catch (error) {
      console.log(error,"in password update in admin")
    }

})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



