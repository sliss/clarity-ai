# Clarity-AI Test Search Engine

## Purpose
A test search engine application for testing real-time ad generation via OpenAds (stratos.js) integration. Built with Next.js 14 + TypeScript.

## Quick Reference

### Key Commands
```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
```

### Project Structure
```
/pages
  index.tsx           # Main search page with OpenAds integration
  dell.tsx            # AI inference article demo
  anthropic.tsx       # Same as dell.tsx
  liner.tsx           # AI inference article variant
  mcdonalds.tsx       # Food safety article demo
  article.tsx         # UTMB trail running demo with product recommendations
  article-mobile.tsx  # Mobile article variant
  /api
    answer.ts         # OpenAI streaming endpoint (Edge runtime)
    sources.ts        # (deprecated) Web scraping/source extraction
    proxy-ads.ts      # Proxy to OpenAds API (local: localhost:3000)

/components
  Search.tsx          # Search interface, triggers stratos.getAds()
  Answer.tsx          # Results display with ad container

/public
  /images             # Demo images (mcd-ad.png, food-prep.png, etc.)
  mcdonalds-abc.html  # ABC news mockup
  mcdonalds-reuters.html # Reuters news mockup
```

## OpenAds / Stratos.js Integration

### Script Loading
```javascript
// Loaded from: https://js.stratos.blue/stratos.js
```

### Publisher IDs
- **Production**: `6660be5c4e70d17b07751c91`
- **Dev (sliss-dev)**: `63e57237d78d35eeaab15162`
- **Demo account**: `66393bf0c2ae100e268f0373`
- **McDonald's demo**: `6723c110a57d08398172c304`

### Configuration (window.stratosSettings)
```javascript
window.stratosSettings = {
  publisherId: '6660be5c4e70d17b07751c91',
  disableInitialLoad: true,
  adSlots: [{
    adUnitCode: 'demo-clarity-chat-ad-infeed',
    adFormat: 'chat',
    size: 'fluid'
  }],
  apiEndpoint: '/api/proxy-ads',
  cssOverrides: { /* custom styling */ }
};
```

### API Usage Flow
1. **Initialize**: Push callback to `window.stratos.queue`
2. **Request Ads**: `window.stratos.getAds(query, true)` - pass user query
3. **Render Ads**: `window.stratos.renderAds()` - call after content loads

### Ad Slot IDs
- `demo-clarity-chat-ad-infeed` - Main search page
- `clarity-demo-chat-ad` - Answer sidebar
- `stratos-content` - Article page iframes

## Search Engine Flow
1. User enters query on homepage
2. `stratos.getAds(query)` - Requests contextual ads
3. `/api/answer` - Streams OpenAI response directly (no web grounding)
4. `stratos.renderAds()` - Displays ads after answer

## Environment Variables
```
OPENAI_API_KEY=<required>
```

## Key Dependencies
- next: 14.0.4
- openai: ^4.22.0
- cheerio: ^1.0.0-rc.12 (HTML parsing)
- @mozilla/readability: ^0.5.0 (content extraction)
- eventsource-parser: ^1.1.1 (SSE streaming)
- tailwindcss: ^3.2.7

## Backend Proxy
`/api/proxy-ads` forwards requests to `https://api.openads.ai/srv/get-ads`

## Demo Pages Summary
| Page | Content | Use Case |
|------|---------|----------|
| index.tsx | Search engine | Main OpenAds demo |
| dell.tsx | AI inference article | Iframe ad integration |
| mcdonalds.tsx | Food safety | McDonald's ad demo |
| article.tsx | Trail running | Product recommendations |
