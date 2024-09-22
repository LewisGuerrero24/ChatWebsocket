import React from 'react'

const ProfileInformation = () => {
    const [open, setOpen] = useState(true); // Inicializa el estado del sidebar
  
    return (
      <div className="flex justify-center items-center min-h-screen">
        {open && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
                open ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div
                className={`w-screen max-w-md transition-transform ${
                  open ? 'transform translate-x-0' : 'transform translate-x-full'
                }`}
              >
                <div className="h-full flex flex-col py-6 bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-xl font-semibold text-black">Search</h2>
                    <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4 px-4">
                    <input
                      type="text"
                      placeholder="Search post here"
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    />
                  </div>
                  <div className="mt-4 px-4">
                    <p className="ml-2 text-gray-400">Results</p>
                  </div>
                  <div className="mt-4 px-4 h-full overflow-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[...Array(12)].map((_, index) => (
                        <div key={index} className="bg-gray-50 hover:bg-gray-100 p-4 cursor-pointer rounded-md border border-gray-300 transition-colors duration-300">
                          <h3 className="text-lg font-semibold text-black mb-2">Card {index + 1}</h3>
                          <p className="text-gray-600">Content for card {index + 1}.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 px-4">
                    <button className="flex justify-center items-center bg-black text-white rounded-md text-sm p-2 gap-1">
                      <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                          fill="currentColor"
                        />
                      </svg>
                      Filters
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-black text-white rounded-md">
          Open Sidebar
        </button>
      </div>
    );
  };

export default ProfileInformation