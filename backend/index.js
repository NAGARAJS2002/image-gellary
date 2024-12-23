import express from "express";
import userRouter from "./routes/userRoute.js";
const app = express();
const PORT = 3000;


app.use('/api/user',userRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    
});

