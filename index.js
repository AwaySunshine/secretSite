import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

//create app & set port
const app = express();
const port = 3000;

//set that user is not authorised
var userIsAuthorised = false;

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//middleware check password
function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
        userIsAuthorised = true;
    }
    next();
}

app.use(passwordCheck);

//#1 route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
//#2 route
app.post("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
     } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  