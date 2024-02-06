import express, { Response, Request } from "express";
import authController from "../controllers/authControllers";
import { IControllerResponse, ISignUpData } from "../interfaces";
let authC = new authController();
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/api/v1/auth/signup", async (req: Request, res: Response) => {
    if(!req.body.data) {
        res.status(400);
        return res.json({
            error: true,
            message: "Invalid data!",
            return: undefined,
            status: 400,
        });
    }
    let user: ISignUpData = req.body.data;
    
    let controllerResponse: IControllerResponse = await authC.signUp(user.username, user.email, user.password);
    res.status(controllerResponse.status);
    res.json(controllerResponse);
});



export default router;