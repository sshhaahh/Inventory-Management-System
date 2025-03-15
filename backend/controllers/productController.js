const mongoose=require("mongoose")
const Product=require("../models/Product");
const User = require("../models/User");

exports.addProduct=async(req,res)=>{
    try{
        const {name,description,quantity,category,price,seller}=req.body;
        if(!name || !description || !quantity || !category || !price || !seller){
            return res.status(400).json({
                success:false,
                message:"Input all field for add product."
            })
        }

        const existingSeller=await User.findById({ _id: seller, role: "Seller" });
        if(!existingSeller){
            return res.status(404).json({
                success:false,
                message:"Seller not found."
            })
        }

        const newProduct=await Product.create({
            name,description,quantity,category,price,seller,
        })

        await User.findByIdAndUpdate(seller,
            {
                $push:{products:newProduct._id}
            },
            {
                new:true
            })

        return res.status(200).json({
            success:true,
            message:"created product successfully.",
            data:newProduct
        })
    }catch(e){
        console.log("Failed to Add product.");
        return res.status(500).json({
            success:false,
            message:"nhi hua"
        })
    }
}


exports.showAllProducts=async(req,res)=>{
    try{
        const products=await Product.find({});
        if(!products){
            return res.status(204).json({
                success:false,
                message:"Empty!"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Show all products is working.",
            data:products
        })
    }catch(e){
        console.error(e);
        return res.status(500).json({
            success:false,
            message:"Failed to show all product."
        })
    }
}

exports.updateProduct=async(req,res)=>{
    try{
        const { id } = req.params;
        const {name,description,quantity,price}=req.body;
       
        const updateField={};

        if(name)updateField.name=name;
        if(description)updateField.description=description;
        if(quantity)updateField.quantity=quantity;
        if(price)updateField.price=price;


        if(Object.keys(updateField).lenght===0){
            return res.status(400).json({
                success:false,
                message:"Enter A field."
            })
        }

        const updatedProduct=await Product.findByIdAndUpdate(id,
            updateField,
            {new:true,runValidators: true}
        )

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success:true,
            message:"Updated Sucessfully.",
            data:updatedProduct,
        })

    }catch(e){
        console.error(e);
        return res.status(500).json({
            success:false,
            message:"Update failed."
        })
    }
}

exports.deleteProduct=async(req,res)=>{
    try{
        const {id}=req.params;

        if(!id){
            return res.status(404).json({
                success:false,
                message:"Invalid Id."
            })
        }

        const product=await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({
                success:false,
                message:"not found in db for delete."
            })
        }


        return res.status(200).json({
            success:true,
            message:"Deleted Successfull.",
            data:product,
        })

    }catch(e){
        console.error(e);
        return res.status(500).json({
            success:false,
            message:"Delete failed."
        })
    }
}