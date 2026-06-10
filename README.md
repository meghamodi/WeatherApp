# Weather App

A containerized weather application with caching, metrics monitoring, and alerting capabilities.

## Features
- Weather data fetching via external API
- PostgreSQL database for caching weather data
- React frontend 

## Prerequisites
- Docker
- Git

## How to Run

### 1. Clone the Repository
```bash
git clone <repository-url>
cd weather-app
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
# Copy the .env file from the medium article.Edit with your values
nano .env
```

Required environment variables:
```
# Database
POSTGRES_HOST=weather-db
POSTGRES_USER=john
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=weather_data
POSTGRES_PORT=5432

# API Keys
RAPID_API_KEY=your_api_key
RAPID_API_HOST=open-weather13.p.rapidapi.com
```


### 4. Access the Services
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Database**: localhost:5432


## Development

### View Logs
```bash
# Specific service
docker logs weather-app-container
docker logs weather-app-frontend
docker logs weather-db
```

### Test API Endpoints
```bash
# Fetch weather data
curl http://localhost:3000/weatherData/London
```

## Project Structure
```
weather-app/
├── server/              # Backend Node.js code
├── src/                 # Frontend React code
├── docker-compose.yml   # Docker services configuration
├── Dockerfile           # Container build instructions
├── prometheus.yml       # Prometheus configuration
├── alert_rules.yml      # Alert rules configuration
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment variables
└── README.md
```

## Troubleshooting

### Containers not starting
```bash
# Check logs
docker logs <container-id>

### Database connection issues
Ensure `.env` file has correct credentials.


