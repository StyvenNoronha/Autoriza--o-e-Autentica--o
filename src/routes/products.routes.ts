import { Router } from "express"
import { ProductsController } from "@/controllers/products-controller"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { verifyUserAuth } from "@/middlewares/verifyUserAuth"
const productsRoutes = Router()
const productsController = new ProductsController()


//Todas as rotas
//productsRoutes.use(verifyUserAuth(["sale","customer"]))

productsRoutes.get("/", productsController.index)
productsRoutes.post("/", ensureAuthenticated,verifyUserAuth(["sale","customer"]), productsController.create)

export { productsRoutes }
