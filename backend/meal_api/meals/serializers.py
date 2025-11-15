from rest_framework import serializers
from .models import Meal

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'name', 'description', 'price', 'is_available', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            # Add help text for better documentation
            self.fields['name'].help_text = 'Name of the meal'
            self.fields['description'].help_text = 'Detailed description of the meal'
            self.fields['price'].help_text = 'Price in USD'
            self.fields['is_available'].help_text = 'Whether the meal is currently available'