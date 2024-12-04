# Request Logger API

A simple Express-based project with middleware to log incoming HTTP requests to a log file in the `/logs` directory. Logs include details such as method, URL, IP address, headers, and request/response metadata.

---


## Requirements

- Node.js (v14 or later)
- npm (v7 or later)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name/request-logger.git
   cd request-logger

2. Install dependencies
   ```js 
    npm install
3. Setup .env file
   ```js 
    cp .env.example .env
```

4. Example of the post data
```js 
{
  "key": "trial_expires",
  "subject": "Your trial period is about to expire DELAYED",
   "delayed_send": "2024-12-04T22:32:00Z",
  "body_data": {
    "name": "John Doe",
    "days": 3,
    "link": {
      "label": "Extend Your Trial",
      "url": "https://example.com/extend-trial"
    }
  },
  "email": [
    "cumlikator1@gmail.com"
  ]
}
```

OR use CURL
```bash
curl --location --request POST 'localhost:4000/api/v1/mail' \
--header 'Content-Type: application/json' \
--data-raw '{
  "key": "trial_expires",
  "subject": "Your trial period is about to expire DELAYED",
   "delayed_send": "2024-12-04T22:32:00Z",
  "body_data": {
    "name": "John Doe",
    "days": 3,
    "link": {
      "label": "Extend Your Trial",
      "url": "https://example.com/extend-trial"
    }
  },
  "email": [
    "cumlikator1@gmail.com"
  ]
}
'