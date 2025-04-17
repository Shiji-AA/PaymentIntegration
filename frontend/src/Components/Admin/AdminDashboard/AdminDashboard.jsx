

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-teal-700 text-white h-full p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-center">Admin</h2>
        <ul>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-lg hover:bg-teal-600 rounded"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-lg hover:bg-teal-600 rounded"
            >
              Certificates
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-lg hover:bg-teal-600 rounded"
            >
              Students
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-lg hover:bg-teal-600 rounded"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-lg hover:bg-teal-600 rounded"
            >
              Log out
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
      

        {/* Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Widget 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-800">Total Students</h3>
            <p className="text-3xl font-bold text-teal-600">1,245</p>
          </div>

          {/* Widget 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-800">Certificates Issued</h3>
            <p className="text-3xl font-bold text-teal-600">312</p>
          </div>

          {/* Widget 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-800">Courses Offered</h3>
            <p className="text-3xl font-bold text-teal-600">15</p>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-teal-800 mb-4">Recent Certificates</h3>
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 text-sm font-semibold text-teal-800">Certificate ID</th>
                <th className="py-2 px-4 text-sm font-semibold text-teal-800">Student Name</th>
                <th className="py-2 px-4 text-sm font-semibold text-teal-800">Course</th>
                <th className="py-2 px-4 text-sm font-semibold text-teal-800">Issued Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">1234</td>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">Web Development</td>
                <td className="py-2 px-4">March 10, 2025</td>
              </tr>
              <tr>
                <td className="py-2 px-4">1235</td>
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">Graphic Design</td>
                <td className="py-2 px-4">March 9, 2025</td>
              </tr>
              <tr>
                <td className="py-2 px-4">1236</td>
                <td className="py-2 px-4">Bob Johnson</td>
                <td className="py-2 px-4">Digital Marketing</td>
                <td className="py-2 px-4">March 8, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;