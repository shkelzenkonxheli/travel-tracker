const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://travel-tracker-psi-lime.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  }),
);

app.get("/visited-countries", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT country_code FROM visited_countries",
    );
    const countries = result.rows.map((row) => row.country_code);
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error on server");
  }
});
app.get("/all-countries", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT country_code, country_name FROM countries ORDER BY country_name",
    );
    const countries = result.rows.map((row) => ({
      code: row.country_code,
      name: row.country_name,
    }));

    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching all countries");
  }
});

app.delete("/delete-country/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM visited_countries WHERE country_code = $1",
      [code],
    );
    if (result.rowCount > 0) {
      res.json({ message: "Country deleted successfully" });
    } else {
      res.status(404).json({ error: "Country not found" });
    }
  } catch (err) {
    console.error("Error deleting country: ", err);
    res.status(500).json({ error: "Error deleting country" });
  }
});

app.post("/add-country", async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Country name is wrong" });
  }

  try {
    console.log("Searching country:", name);
    const result = await pool.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1",
      [`%${name.trim().toLowerCase()}%`],
    );

    console.log("Result: ", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Canot find country on database" });
    }

    const countryCode = result.rows[0].country_code;

    const exists = await pool.query(
      "SELECT * FROM visited_countries WHERE country_code = $1",
      [countryCode],
    );

    console.log("Checking visited_countries:", exists.rows);
    if (exists.rows.length > 0) {
      return res.status(400).json({ error: "Is already visited" });
    }

    await pool.query(
      "INSERT INTO visited_countries (country_code) VALUES ($1)",
      [countryCode],
    );

    res.json({ message: `Country ${name} added sunccessfully` });
  } catch (err) {
    console.error("Gabim ne server:", err);
    res.status(500).json({ error: "Error on server" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
