import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoryCardsProps {
  categories: Category[];
}

const CategoryCards = ({ categories }: CategoryCardsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="relative aspect-square">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <h3 className="text-white text-xl font-semibold text-center drop-shadow-md">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;