# Weather App

A containerized weather application with caching, metrics monitoring, and alerting capabilities.

## Features
- Weather data fetching via external API
- PostgreSQL database for caching weather data
- Prometheus metrics monitoring
- Custom alerts for monitoring application health
- React frontend with hot reload support

## Prerequisites
- Docker and Docker Compose installed
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
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env
```

Required environment variables:
```
# Database
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=weather_data

# API Keys
RAPID_API_KEY=your_api_key
RAPID_API_HOST=open-weather13.p.rapidapi.com
```

### 3. Start the Application
```bash
docker-compose up -d
```

### 4. Access the Services
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Prometheus**: http://localhost:9090
- **Prometheus Alerts**: http://localhost:9090/alerts
- **Database**: localhost:5432

### 5. Stop the Application
```bash
docker-compose down
```

## Monitoring

### View Metrics
Access Prometheus at http://localhost:9090 and try these queries:
```promql
# Total requests
weather_requests_total

# Cache hit rate
(weather_cache_hits_total / weather_requests_total) * 100

# Request rate per minute
rate(weather_requests_total[1m]) * 60
```

### View Alerts
Check configured alerts at http://localhost:9090/alerts

Current alerts:
- **NoWeatherRequests**: Fires when no requests received for 30 seconds

## Development

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker logs weather-app-container
docker logs weather-app-frontend
docker logs weather-app-prometheus-1
docker logs weather-db
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up --build -d
```

### Test API Endpoints
```bash
# Fetch weather data
curl http://localhost:3000/weatherData/London

# View metrics
curl http://localhost:3000/metrics
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
docker-compose logs

# Restart services
docker-compose restart
```

### Database connection issues
Ensure `.env` file has correct credentials and matches `docker-compose.yml`

### Prometheus not showing metrics
1. Check API is exposing metrics: `curl http://localhost:3000/metrics`
2. Verify Prometheus targets: http://localhost:9090/targets
3. Check Prometheus logs: `docker logs weather-app-prometheus-1`

