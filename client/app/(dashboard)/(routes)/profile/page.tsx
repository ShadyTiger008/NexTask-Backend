"use client"
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type User = {
  createdAt: string;
  email: string;
  fullName: string;
  occupation: string;
  password: string;
  picturePath: string;
  todos: any[]; // Replace 'any[]' with the actual type of your todos
  updatedAt: string;
  userName: string;
  __v: number;
  _id: string;
  // Add other properties as needed
};

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fetch the user data from localStorage
      const userData = localStorage.getItem('User');
      if (userData) {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('User');
    router.refresh();
  }

  return (
    <main>
      <Heading
          title="Profile"
          description="Check your profile details"
          icon={User}
          iconColor="text-pink-500"
          bgColor="bg-pink-500/10"
        />
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          {user ? (
            <div>
              <div className="flex items-center justify-center mb-6">
                <img
                  src={user.picturePath || 'https://github.com/shadcn.png'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-semibold mb-2">{user.fullName}</h1>
              <p className="text-gray-600 text-sm mb-4">Occupation: {user.occupation}</p>
              <p className="text-gray-600 text-sm mb-4">Username: {user.userName}</p>
              <p className="text-gray-600 text-sm mb-4">Email: {user.email}</p>
              <p className="text-gray-600 text-sm mb-4">
                Member since: {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <Button variant='destructive' onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <p className='text-center'>Sign In to see your proile</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
