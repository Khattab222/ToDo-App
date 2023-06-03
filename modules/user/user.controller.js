
import { compareFunction, hashFunction } from "../../utils/hashfunction.js";
import { tokkenFunction } from "../../utils/tokkenFunction.js";
import userModel from "./../../DB/models/user.models.js";

// sign up controller
export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, cpass, age } = req.body;
    const usercheck = await userModel.findOne({ email });
    if (usercheck) {
      res.json({ message: "email already exists" });
    } else {
      const hashPassword = hashFunction({ payload: password });
      const newUser = new userModel({
        name,
        email,
        password: hashPassword,
        age,
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        res.json({ message: "sign up success", savedUser });
      } else {
        res.json({ message: "fail sign up ", savedUser });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error from sign up", error });
  }
};

// login controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      const match = compareFunction({
        payload: password,
        refrencedata: userExist.password,
      });
      if (match) {
        const token = tokkenFunction({payload:{id:userExist._id,email,name:userExist.name}})
        if (token) {
            res.json({ message: "login success",token });
        } else {
        res.json({ message: "fail generation token  " });
            
        }
       
      } else {
        res.json({ message: "invalid login information  " });
      }
    } else {
      res.json({ message: "invalid login information  " });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error from sign in ", error });
  }
};

//delete profile 
export const deleteprofile = async (req, res, next) => {
  try {

    const {id} = req.params

      const userExist = await userModel.findByIdAndDelete(id);
      if (userExist) {
        res.json({ message: "deleted success " });

      } else {
        res.json({ message: "invalid user id " });
      }
   
 
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error from delete profile ", error });
  }
};

// update profile
export const updateprofile = async (req, res, next) => {
  try {

    const {_id} = req.user
    const {name,age} = req.body

      const updateuser = await userModel.findByIdAndUpdate({_id},{name,age},{new:true});

      console.log(updateuser)
      if (updateuser) {
        res.json({ message: "update success " , data: updateuser});

      } else {
        res.json({ message: "invalid user id " });
      }
   
 
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error from update profile ", error });
  }
};

// logout
export const logOut = async (req,res) => {
  try {

    req.user= {}; 
    console.log(req.user)
    if (!Object.keys(req.user).length ) {
      res.json({messgae:'logout success'})
    } else {
      res.json({messgae:'logout fail'})
      
    }
  
    
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error from logout ", error });
  }
}




