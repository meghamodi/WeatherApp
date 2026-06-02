from random import choice
from locust import HttpUser, task, between


cities = [
    "Dallas",
    "Austin",
    "Houston",
    "Seattle",
    "Chicago"
]


class WeatherUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def get_weather(self):
        city = choice(cities)
        self.client.get(f"/weatherData/{city}")