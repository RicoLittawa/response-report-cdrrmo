const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Report = require("./Models/reports");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/reports");

app.post("/reports", (req, res) => {
  const reportData = req.body.reports;
  // Assuming reportData is an array of report objects, you can create multiple reports
  Report.create(reportData)
    .then((result) => {
      console.log("Data saved successfully:", result);
      res.json(result);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Error saving data" });
    });
});

app.get("/reports", (req, res) => {
  Report.find()
    .then((reports) => {
      res.json(reports);
    })
    .catch((error) => {
      console.error("Error fetching reports:", error);
      res.status(500).json({ error: "Error fetching reports" });
    });
});

app.get("/reports/:id", (req, res) => {
  const { id } = req.params;
  Report.findById(id) // Use findById to find a report by its ID
    .then((reports) => {
      if (!reports) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(reports);
    })
    .catch((error) => {
      console.error("Error fetching report:", error);
      res.status(500).json({ message: "Server error" });
    });
});

app.listen(3000, () => {
  console.log("Server is running");
});
