# Wordle API

A Next.js API for serving daily Wordle words with multi-language support. This API provides consistent daily words across timezones and supports English, Spanish, and French languages.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd wordle-api
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
# Create .env.local file
API_KEY=your-secret-api-key
CLIENT_URL=https://your-frontend-domain.com
```

4. Run the development server

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/word`

## 📖 API Documentation

### Get Daily Word

**Endpoint:** `GET /api/word`

Returns the daily word for the specified language. All users get the same word for the same UTC date.

#### Headers

```
x-api-key: your-secret-api-key (required)
```

#### Query Parameters

| Parameter | Type   | Default | Description                      |
| --------- | ------ | ------- | -------------------------------- |
| `lang`    | string | `en`    | Language code (`en`, `es`, `fr`) |

#### Example Requests

**English (default):**

```bash
curl -H "x-api-key: your-api-key" \
  "https://your-domain.com/api/word"
```

**Spanish:**

```bash
curl -H "x-api-key: your-api-key" \
  "https://your-domain.com/api/word?lang=es"
```

**French:**

```bash
curl -H "x-api-key: your-api-key" \
  "https://your-domain.com/api/word?lang=fr"
```

#### Success Response

```json
{
  "word": "REACT",
  "language": "en",
  "date": "2024-12-15"
}
```

#### Error Responses

**401 Unauthorized:**

```json
"Unauthorized"
```

**400 Bad Request (Invalid Language):**

```json
{
  "error": "Unsupported language: de. Supported languages: en, es, fr"
}
```

## 🌍 Supported Languages

| Language | Code | Word Count  |
| -------- | ---- | ----------- |
| English  | `en` | ~2000 words |
| Spanish  | `es` | ~2000 words |
| French   | `fr` | ~2000 words |

## 🔧 Configuration

### Environment Variables

| Variable     | Description                       | Required |
| ------------ | --------------------------------- | -------- |
| `API_KEY`    | Secret key for API authentication | Yes      |
| `CLIENT_URL` | Allowed origin for CORS           | Yes      |

### CORS Configuration

The API is configured to allow requests from the domain specified in `CLIENT_URL`. Only GET and OPTIONS methods are allowed.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── word/
│   │       └── route.ts          # Main API endpoint
│   └── ...
├── data/
│   ├── words-en.json             # English words
│   ├── words-es.json             # Spanish words
│   └── words-fr.json             # French words
└── middleware.ts                 # CORS configuration
```

## 🎯 How Daily Words Work

1. **Consistent Algorithm**: Uses UTC date and days since January 1, 2024
2. **Same Word Globally**: All users get the same word for the same UTC date
3. **Language-Specific**: Each language has its own word rotation
4. **Predictable**: Word index = `days_since_start % word_list_length`

## 🚀 Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

```bash
API_KEY=your-production-api-key
CLIENT_URL=https://your-production-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Projects

- [Word Lists](https://github.com/arbxz/wordle-word-list-gen): Custom curated 5-letter word lists for each language
