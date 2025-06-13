# Tradera Proxy API

En enkel proxy för att visa Tradera-bud på din hemsida.

## Miljövariabel

Lägg till `TRADERA_API_TOKEN` i Vercel Settings → Environment Variables

## Exempelanrop:

`/api/item?itemId=678849361`

Returnerar:

```json
{
  "maxBid": 120,
  "totalBids": 6,
  "endDate": "2025-06-13T18:00:00"
}
