import { Router, Application, Request, Response } from "express";
import { API_VERSION } from "@/utils/version";
import userController from "@/controllers/user.controller";
import productController from "@/controllers/product.controller";

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  res.json({ message: "Hello, World!!" });
});

/* Handle routes for user user controller */
router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
router.route("/get-session").get(userController.getSession);

/* Handle routes for user product controller */
router.route("/product/create-product").post(productController.createProduct);
router.route("/product/get-all-product").get(productController.getAllProducts);
router.route("/product/get-product").post(productController.getProduct);
router.route("/product/update-product").put(productController.updateProduct);
router.route("/product/delete-product/:id").delete(productController.deleteProduct);

/* Initialize router */
export const initializeRoutes = (app: Application) =>
  app.use(API_VERSION, router);