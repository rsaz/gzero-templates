from django.urls import path

from dashboard import views

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("api/dashboard", views.dashboard_api, name="dashboard-api"),
    path("health", views.health, name="health"),
]
