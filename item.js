export default async function handler(req, res) {
  const { itemId } = req.query;

  if (!itemId) {
    return res.status(400).json({ error: "Ingen itemId angiven." });
  }

  try {
    const response = await fetch(`https://api.tradera.com/v3/public/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${process.env.TRADERA_API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error("Fel från Tradera API");
    }

    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json({
      maxBid: data.maxBid?.amount || 0,
      totalBids: data.totalBids || 0,
      endDate: data.endDate || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunde inte hämta data från Tradera." });
  }
}
