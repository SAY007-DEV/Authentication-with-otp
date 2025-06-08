import crypto from 'crypto'
import User from '../Database/model';

const Resgister= async (req,res)=>{
    const{email,password}=req.body;
    try {
        const ExistUser = await User.findOne({email});
        if(ExistUser)
        {
            res.status(400).json({message:'User Alredy exist '})
        }
        const NewUser = new User({email,password});
        await NewUser.save();
        res.status(200).json({message:'new user created'});

    } catch (error) {
        res.status(500).json({message:'insternal server error',error});
    }

}

const Otp = async (req,res)=>{

    const {email}=req.body;

    try {

        const user = await User.findOne({email});
    
        if(!user)
        {
            res.status(400).json({message:"user not exist"});
        }
        const otp = crypto.randomInt(300000,999999).toString();
        user.otp =otp;
        user.vilidity =Date.now() + 7*60*1000;
        user.save();

        
    } catch (error) {
        res.status(500).json({message:'insternal server error',error});
    }
}