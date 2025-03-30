const Login = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input type="text" placeholder="Email" className="w-full p-2 mb-4 rounded bg-gray-700" />
          <input type="password" placeholder="Password" className="w-full p-2 mb-4 rounded bg-gray-700" />
          <button className="w-full bg-blue-600 p-2 rounded">Login</button>
        </div>
      </div>
    );
  };

export default Login;