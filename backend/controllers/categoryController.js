const Category=require("../models/Category");

exports.addCategory=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(401).json({
                success:false,
                message:"Name Required!"
            })
        }
        const newCategory=await Category.create({name});
        return res.status(200).json({
            success:true,
            message:"Add category successfull.",
            data:newCategory,
        })
    }catch(e){
        console.log("Problem in add category",e);
        return res.status(500).json({
            success:true,
            message:"Add catefory problem"
        })
    }
}

exports.showAllCategory=async(req,res)=>{
    try{
        const category=await Category.find({});
        if(category.length===0){
            return res.status(404).json({
                success:false,
                message:"Empty!"
            })
        }
        return res.status(200).json({
            success:true,
            data:category,
        })
    }catch(e){
        console.log("fail show all category")
        return res.status(500).json({
            success:false,
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required."
            });
        }

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
            data: deletedCategory
        });

    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: error.message
        });
    }
};
