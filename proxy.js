const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.post("/api/textrazor", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.textrazor.com/",
      `text=${encodeURIComponent(req.body.text)}&extractors=${
        req.body.analysisType
      }`,
      {
        headers: {
          "X-TextRazor-Key": "",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(response.data.response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error analyzing text");
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
