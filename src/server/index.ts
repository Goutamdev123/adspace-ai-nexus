import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generateCampaignSuggestion } from "./routes/generateCampaignSuggestion";

const app = express();
const PORT = 3001;

app.use(cors()); // Allow frontend access
app.use(bodyParser.json()); // Parse JSON bodies

// Route for AI suggestions
app.post("/api/generate-campaign-suggestion", generateCampaignSuggestion);

// Start server
app.listen(PORT, () => {
  console.log(`✅ API Server running at http://localhost:${PORT}`);
});
