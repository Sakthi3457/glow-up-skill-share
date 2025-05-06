import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Skill {
  id: number;
  name: string;
  level: string;
  user: {
    id: string;
    name: string;
    rating: number;
  };
  description: string;
  location: string;
  availability: string[];
}

export default function SkillListings() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Mock data - replace with actual data from your backend
  const skills: Skill[] = [
    {
      id: 1,
      name: 'JavaScript',
      level: 'Expert',
      user: {
        id: '1',
        name: 'John Doe',
        rating: 4.8,
      },
      description: 'I can help you master JavaScript and modern web development.',
      location: 'New York',
      availability: ['Monday', 'Wednesday', 'Friday'],
    },
    {
      id: 2,
      name: 'Spanish',
      level: 'Advanced',
      user: {
        id: '2',
        name: 'Jane Smith',
        rating: 4.9,
      },
      description: 'Native Spanish speaker offering conversational practice.',
      location: 'Los Angeles',
      availability: ['Tuesday', 'Thursday', 'Saturday'],
    },
    {
      id: 3,
      name: 'Guitar',
      level: 'Intermediate',
      user: {
        id: '3',
        name: 'Mike Johnson',
        rating: 4.7,
      },
      description: 'Learn guitar from basics to advanced techniques.',
      location: 'Chicago',
      availability: ['Monday', 'Saturday', 'Sunday'],
    },
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel;
    const matchesLocation = selectedLocation === 'all' || skill.location === selectedLocation;
    return matchesSearch && matchesLevel && matchesLocation;
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Skill Listings</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Search and filters */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Search skills..."
                />
              </div>
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Skill Level
                </label>
                <select
                  id="level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="all">All Locations</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Skill listings */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {skill.level}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {skill.user.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {skill.user.name}
                        </p>
                        <div className="flex items-center">
                          <svg
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            {skill.user.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Location:</span> {skill.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Available:</span>{' '}
                      {skill.availability.join(', ')}
                    </p>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Request Exchange
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 