const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Report = require("./Models/Reports.js");
const uri =
  "mongodb+srv://ricolittawa030620:8LpeM1AS2SyRTYUl@cdrrmo.bfvmf8d.mongodb.net/reports?retryWrites=true&w=majority";

const app = express();

const corsOptions = {
  origin: ["https://frontend-nu-amber.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(uri);

app.get("/", (req, res) => {
  res.json("hello");
});

//Put Request
app.post("/", (req, res) => {
  const reportData = req.body.reports;
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

//Fetch data for table
app.get("/", (req, res) => {
  Report.find()
    .then((reports) => {
      res.json(reports);
    })
    .catch((error) => {
      console.error("Error fetching reports:", error);
      res.status(500).json({ error: "Error fetching reports" });
    });
});

//Fetch data for update
app.get("/update/:id", (req, res) => {
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

//Update data of reports
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.reports;
  Report.findByIdAndUpdate(id, updatedData, { new: true })
    .then((updatedReport) => {
      if (!updatedReport) {
        return res.status(404).json({ message: "Report not updated" });
      }
      res.json(updatedReport);
    })
    .catch((error) => {
      console.error("Error fetching report:", error);
      res.status(500).json({ message: "Server error" });
    });
});

//Delete Reports
app.delete("/deleteReports/:id", (req, res) => {
  const { id } = req.params;
  Report.findByIdAndDelete(id)
    .then((deletedReport) => {
      if (!deletedReport) {
        // If the report was not found, respond with a 404 status code
        return res.status(404).json({ message: "Report not found" });
      }
      // Report was found and deleted successfully, respond with a 200 status code
      res.status(200).json({ message: "Report deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting report:", error);
      res.status(500).json({ message: "Server error" });
    });
});

app.listen(3000, () => {
  console.log("Server is running");
});
