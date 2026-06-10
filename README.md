# Weather App

A containerized weather application that fetches real-time weather data from an external API and caches responses to improve performance and reduce API calls.

## Features
- Weather data fetching via external API
- PostgreSQL database for caching weather data
- React frontend 

## Prerequisites
- Docker
- Rapid Api account and key

## How to Run

### 1. Clone the Repository
```bash
git clone <repository-url>
cd weather-app
```

### 2. Set Up Environment Variables
Create a `.env` file in the server directory:
```bash
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
- **Database**(inside docker container)
```
docker exec -it weather-db psql -U <username> -d <dbname>
```

### View Logs
```bash
# Specific service
docker logs weather-backend
docker logs weather-frontend
docker logs weather-db
```

### Test API Endpoints
```bash
# Fetch weather data
curl http://localhost:3000/weatherData/London
```

## Troubleshooting

### Containers not starting
```bash
# Check logs
docker logs <container-id>

Ensure Docker has the necessary permissions for the directory where you plan to clone the project. 

### Database connection issues
Ensure `.env` file has correct credentials.


