import express from "express";
import mysql from "mysql";
import cors from "cors";

const port = 8800;
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ze2871781O.!",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hi from backend");
});
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover, req.body.price];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.listen(port, () => {
  console.log("Connected to backend!");
});
