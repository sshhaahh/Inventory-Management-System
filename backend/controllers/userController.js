const User=require("../models/User")

exports.addSeller=async(req,res)=>{
    try{
        const {name,email,number}=req.body;
        if(!name || !email || !number){
            return res.status(400).json({
                success:false,
                message:"All field required!"
            })
        }
        const alreadyRegistered=await User.findOne({email});
        if(alreadyRegistered){
            return res.json({
                success:false,
                message:"User Already registered."
            })
        }

        const newSeller=await User.create({name,email,number,role:"Seller"})
        return res.status(201).json({
            success:true,
            message:"Seller Created Successfully",
            data:newSeller,
        })

    }catch(e){
        console.error("Error on adding seller",e)
        return res.status(500).json({
            success:false,
            message:"Failed to created Seller."
        })
    }
}

exports.showAllSeller=async(req,res)=>{
    try{
        const sellers=await User.find({role:"Seller"});

        if(sellers.length===0){
            return res.status(404).json({ 
                success:false,
                message:"Sellers not found!"
            })
        }

        return res.status(200).json({
            success:true,
            message:"All Sellers are ",
            data:sellers,
        })
    }catch(e){
        console.log("Show All Seller Failed.",e);
        return res.status(500).json({
            success:false,
            message:"Show all seller failed!"
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required."
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully.",
            data: deletedUser
        });

    } catch (error) {
        console.error("Error deleting User:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete User",
            error: error.message
        });
    }
};


exports.addCustomer=async(req,res)=>{
    try{
        const {name,email,number}=req.body;
        if(!name || !email || !number){
            return res.status(400).json({
                success:false,
                message:"All field required!"
            })
        }
        const alreadyRegistered=await User.findOne({email});
        if(alreadyRegistered){
            return res.json({
                success:false,
                message:"User Already registered."
            })
        }

        const newSeller=await User.create({name,email,number,role:"Customer"})
        return res.status(201).json({
            success:true,
            message:"Customer Created Successfully",
            data:newSeller,
        })

    }catch(e){
        console.error("Error on adding customer",e)
        return res.status(500).json({
            success:false,
            message:"Failed to created customer."
        })
    }
}

exports.showAllCustomer=async(req,res)=>{
    try{
        const customers=await User.find({role:"Customer"});

        if(customers.length===0){
            return res.status(404).json({ 
                status:false,
                message:"Customers not found!"
            })
        }

        return res.status(200).json({
            status:true,
            message:"All Customers are ",
            data:customers,
        })
    }catch(e){
        console.log("Show All Customers Failed.",e);
        return res.status(500).json({
            success:false,
            message:"Show all Customers failed!"
        })
    }
}