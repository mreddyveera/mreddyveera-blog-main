import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

function DashProfile() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-10 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>

        <form className="flex flex-col items-center gap-4">
          {/* Circular Profile Image */}
          <div className="w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full border-8 border-gray-300">
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.name}
            className="w-1/2"
          />
          <TextInput
            type="text"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            className="w-1/2"
          />
          <TextInput
            type="password"
            id="password"
            placeholder="password"
            defaultValue={currentUser.password}
            className="w-1/2"
          />

          <Button
            type="submit"
            className="w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Update
          </Button>
        </form>

        <div className="text-red-500 flex justify-between mt-5 mb-5 mr-5 pl-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </div>
    </div>
  );
}

export default DashProfile;
