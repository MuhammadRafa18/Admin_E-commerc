import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const app = jsonServer.create();
const router = jsonServer.router("db.json");


// Middleware 
app.use(cors());
app.use(jsonServer.bodyParser);


// Register & Login routes otomatis dari json-server-auth
app.db = router.db;

app.use(auth);
app.use(router);

app.listen(5000, () => {
    console.log("JSON Server running at http://localhost:5000");
});