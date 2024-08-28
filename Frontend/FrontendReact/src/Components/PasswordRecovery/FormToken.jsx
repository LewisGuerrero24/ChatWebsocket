import React from 'react'

export const FormToken = () => {

  const [token,setToken] = useState()

    const handleSubmit = async(e) => { }

  return (
    <div className="h-screen bg-emerald-500 flex justify-center items-center w-full">
  <form onSubmit={handleSubmit}> 
    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
      <div className="space-y-4">
        <h1 className="text-center text-2xl font-semibold text-gray-600">Log In</h1>
        <div>
          <label for="username" className="block mb-1 text-gray-600 font-semibold">Token</label>
          <input ype="text" value={token} onChange={(e)=> setToken(e.target.value)}  className="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      </div>
      <button  type="submit" className="mt-4 w-full bg-emerald-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Ingresar</button>
    </div>
  </form>
</div>
  )
}
