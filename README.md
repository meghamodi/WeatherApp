# Weather App

A containerized weather application with caching, metrics monitoring, and alerting capabilities.

## Features
- Weather data fetching via external API
- React frontend with hot reload support

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
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/weatherData/London

### 5. Stop the Application
```bash
docker-compose down
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


