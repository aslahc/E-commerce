const express = require("express");
const user_route = express();
const session = require("express-session");

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const addressController = require("../controllers/addressController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const wishlistController = require("../controllers/wishlistController");
const couponController = require("../controllers/couponController");

// Set views directory
user_route.set("views", "./views/users");

// Session setup
user_route.use(
  session({
    secret: "config.sessionSecret",
    resave: false,
    saveUninitialized: true,
  })
);

// Authentication middleware
const auth = require("../middleware/auth");

// Define routes
user_route.get("/", userController.loadHome);
user_route.get("/login", auth.isLogout, userController.loginLoad);
user_route.post("/login", auth.isLogout, userController.verifyLogin);
user_route.get("/register", auth.isLogout, userController.loadRegister);
user_route.post("/register", userController.insertUser); // Removed redundant auth.isLogout
user_route.get("/verifyOtp", auth.isLogout, userController.verifyPageLoad);
user_route.post("/verifyOtp", auth.isLogout, userController.confirmOtp);
user_route.get("/home", auth.isLogin, userController.loadHome);
user_route.get("/logout", auth.isLogin, userController.userLogout);
user_route.get("/resendOtp", userController.resendOtp);

// Additional routes
user_route.get("/productDetails", productController.productDetailsPage);
user_route.post("/productDetails/:id", cartController.addToCart);
user_route.get("/shopList", productController.shopList);

// Cart routes
user_route.post("/addCart-icon", cartController.addCartIcon);
user_route.get("/cart", cartController.loadCart);
user_route.delete("/delete-cartItem", cartController.deleteCartItem);
user_route.post("/cart/qtyInc", cartController.qtyInc);
user_route.post("/cart/qtyDec", cartController.qtyDec);

// Checkout and profile routes
user_route.get("/checkout", auth.isLogin, cartController.checkoutPage);
user_route.get("/profile", auth.isLogin, addressController.profilePage);
user_route.post("/addAddress", auth.isLogin, addressController.addAddress);
user_route.delete(
  "/deletAddress",
  auth.isLogin,
  addressController.deletAddress
);
user_route.get("/editAddress", auth.isLogin, addressController.loadEditAddress);
user_route.post(
  "/editAddress",
  auth.isLogin,
  addressController.editAddressSave
);
user_route.get("/editProfile", auth.isLogin, addressController.editProfile);
user_route.post("/editProfile", auth.isLogin, addressController.updateUserData);

// Order routes
user_route.post("/orderPlaced", auth.isLogin, orderController.orderComplete);
user_route.get("/order", auth.isLogin, orderController.orderCompleteLoad);
user_route.get("/orderDetails", auth.isLogin, orderController.orderDetails);
user_route.put(
  "/cancelOrder/:orderId/:pId",
  auth.isLogin,
  orderController.cancelOrder
);

// Search route
user_route.post("/search", auth.isLogin, productController.shopList);

// Invoice routes
user_route.get("/invoice", auth.isLogin, orderController.invoice);
user_route.get("/saveinvoice", auth.isLogin, orderController.saveInvoice);

// Wishlist routes
user_route.get("/wishlist", auth.isLogin, wishlistController.loadWishlist);
user_route.post("/addwishlist", auth.isLogin, wishlistController.addToWishlist);
user_route.post(
  "/wishlistCart",
  auth.isLogin,
  wishlistController.wishlistToCart
);
user_route.delete(
  "/delete-wishlist",
  auth.isLogin,
  wishlistController.deleteWishlist
);

// Coupon routes
user_route.post("/addcouponcode", auth.isLogin, couponController.addCouponCode);
user_route.post("/remove-coupon", auth.isLogin, couponController.removeCoupon);

// about page
user_route.get("/about", userController.aboutPage);

// forget password

user_route.get(
  "/forgetPasswordEmail",
  userController.forgetPassEmailVerifyPageLoad
);
user_route.post("/forgetPasswordEmail", userController.verifyEmail);
user_route.get("/ForgetPassVerifyOtp", userController.forgetPassVerifyOtp);
user_route.post("/ForgetPassVerifyOtp", userController.verifyOtp);
user_route.post("/changePassword", userController.changePassword);
module.exports = user_route;
