const {addProduct,showAllProducts,updateProduct,deleteProduct}=require("../controllers/productController");
const {addSeller,showAllSeller,deleteUser}=require("../controllers/userController")
const {addCategory,showAllCategory,deleteCategory}=require("../controllers/categoryController")
const  express=require("express")
const router=express.Router();


router.post("/addproduct",addProduct);
router.get("/showproducts",showAllProducts);
router.put("/updateproduct/:id",updateProduct);
router.delete("/deleteproduct/:id",deleteProduct);


router.post("/addseller",addSeller);
router.get("/sellers",showAllSeller);
router.delete("/deleteseller/:id",deleteUser);


router.post("/addcategory",addCategory)
router.get("/categories",showAllCategory);
router.delete("/deleteCategory/:id",deleteCategory)




module.exports=router