import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Passionate about learning and sharing knowledge.');
  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', level: 'Expert' },
    { id: 2, name: 'React', level: 'Advanced' },
    { id: 3, name: 'Spanish', level: 'Intermediate' },
  ]);

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Profile header */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio section */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                About
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                {isEditing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p>{bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Skills
                </h3>
                {isEditing && (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Skill
                  </button>
                )}
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 dark:hover:border-gray-500"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Level: {skill.level}
                        </p>
                      </div>
                      {isEditing && (
                        <button
                          type="button"
                          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        {isEditing && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 