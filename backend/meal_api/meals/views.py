from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Meal
from .serializers import MealSerializer


class MealViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Meals.

    Provides CRUD operations for meals including:
    - List all meals
    - Create a new meal
    - Retrieve a specific meal
    - Update a meal
    - Delete a meal
    """
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

    @swagger_auto_schema(
        operation_description="Get a list of all meals",
        responses={200: MealSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        """List all meals"""
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new meal",
        request_body=MealSerializer,
        responses={
            201: MealSerializer(),
            400: "Bad Request"
        }
    )
    def create(self, request, *args, **kwargs):
        """Create a new meal"""
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Get details of a specific meal",
        responses={
            200: MealSerializer(),
            404: "Not Found"
        }
    )
    def retrieve(self, request, *args, **kwargs):
        """Retrieve a specific meal by ID"""
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Update a meal completely",
        request_body=MealSerializer,
        responses={
            200: MealSerializer(),
            400: "Bad Request",
            404: "Not Found"
        }
    )
    def update(self, request, *args, **kwargs):
        """Update a meal (full update)"""
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Partially update a meal",
        request_body=MealSerializer,
        responses={
            200: MealSerializer(),
            400: "Bad Request",
            404: "Not Found"
        }
    )
    def partial_update(self, request, *args, **kwargs):
        """Partially update a meal"""
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Delete a meal",
        responses={
            204: "No Content",
            404: "Not Found"
        }
    )
    def destroy(self, request, *args, **kwargs):
        """Delete a meal"""
        return super().destroy(request, *args, **kwargs)