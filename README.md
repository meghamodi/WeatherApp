# Weather App

A containerized weather application with caching, metrics monitoring, and alerting capabilities.

## Features
- Weather data fetching via external API
- React frontend with hot reload support

## Prerequisites
- Docker
- Git
-Rapid API account(free)

## How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/meghamodi/WeatherApp/tree/part3
cd weather-app
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
# Edit with your values
vim .env
```

Required environment variables:
```
# Database
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=weather_data
POSTGRES_PORT=5432

# API Keys
RAPID_API_KEY=your_api_key
RAPID_API_HOST=open-weather13.p.rapidapi.com

#Grafana
GF_ADMIN_USER=admin
GF_ADMIN_PASSWORD=admin
```

### 3. Start the Application
```bash
docker-compose up -d
```
### 4. Stop the Application
```bash
docker-compose down
```

### 5. Access the Services
```
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/weatherData/London
```

## Development

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker logs weather-app-container
docker logs weather-app-frontend
docker logs weather-db
docker logs prometheus
docker logs grafana
docker logs locust
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up --build -d
```

### Test API Endpoints
```bash
# Fetch weather data
curl http://localhost:5001/weatherData/London

# View the metrics exposed by application
http://localhost:5001/metrics
```

## Dashboards
Grafana
http://localhost:3002

Prometheus
http://localhost:9090

Locust
http://localhost:8089
To access locust web UI in browser, remove the line --headless option from command under locust service in docker-compose.yml and rebuild the containers by running:
docker-compose up --build -d

### Containers not starting
```bash
# Check logs
docker-compose logs

# Restart services
docker-compose restart
```

### Database connection issues
Ensure `.env` file has correct credentials and matches `docker-compose.yml`


