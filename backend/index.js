const express=require('express');
const app = express();
app.get('/',(req,res)=> {
res.send("hello world!!!!!");    
});
app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    console.log("Server is listining on port: ", process.env.PORT);
    require("./configs/db.config");
  });