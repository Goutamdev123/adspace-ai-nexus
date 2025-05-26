import { Request, Response } from "express";

export const generateCampaignSuggestion = (req: Request, res: Response) => {
  const { input, industry, budget, sector } = req.body;

  const suggestion = `📊 Based on your $${budget} budget in the ${industry} industry (${sector} sector), we recommend:

- AR Billboards synced with mobile ads
- Geo-tracked posters with QR codes
- Real-time metrics dashboard
- Government campaign compliance tagging

→ “${input}” understood as your primary goal.`;

  res.json({ suggestions: suggestion });
};
