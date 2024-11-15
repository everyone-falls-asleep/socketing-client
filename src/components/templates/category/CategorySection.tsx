import React from "react";

const categories = [
  { name: "Concerts", icon: "🎤" },
  { name: "Sports", icon: "🏀" },
  { name: "Theater", icon: "🎭" },
  { name: "Family", icon: "👪" },
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow hover:bg-gray-200 cursor-pointer"
          >
            <div className="text-4xl">{category.icon}</div>
            <h3 className="mt-4 text-xl font-medium">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
