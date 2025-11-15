import { useState } from "react";


interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface MealFormData {
  name: string;
  description: string;
  price: string;
  is_available: boolean;
}

// Meal Form View Component
const MealForm: React.FC<{
  meal?: Meal | null;
  onSuccess: () => void;
  onCancel: () => void;
}> = ({ meal, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<MealFormData>({
    name: meal?.name || "",
    description: meal?.description || "",
    price: meal?.price.toString() || "",
    is_available: meal?.is_available ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const url = meal
        ? `http://localhost:8000/api/meals/${meal.id}/`
        : "http://localhost:8000/api/meals/";

      const response = await fetch(url, {
        method: meal ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price), // ✅ Already correct - keeps this
          is_available: formData.is_available,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to save");
      }

      alert(`Meal ${meal ? "updated" : "created"} successfully!`);
      onSuccess();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save meal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {meal ? "Edit Meal" : "Add New Meal"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="e.g., Grilled Chicken"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.description ? "border-red-500" : ""
              }`}
              rows={4}
              placeholder="Describe the meal..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.price ? "border-red-500" : ""
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              checked={formData.is_available}
              onChange={(e) =>
                setFormData({ ...formData, is_available: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="available" className="ml-2 text-sm text-gray-700">
              Available for order
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : meal
                ? "Update Meal"
                : "Create Meal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MealForm;
