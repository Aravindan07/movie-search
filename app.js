const express = require("express");
const path = require("path");
const request = require("request");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/results", (req, res) => {
  let query = req.query.search;

  request(
    "https://api.themoviedb.org/3/search/movie?api_key=63953bb47123a5e58d2e7ecdeaf882e7&query=" +
      query,
    (error, response, body) => {
      if (error) {
        console.log(error);
      }
      let data = JSON.parse(body);
      res.render("movies", { data: data, searchQuery: query });
    }
  );
});

app.get("", (req, res) => {
  res.render("search");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running at port 8080");
});
