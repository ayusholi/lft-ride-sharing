import Image from 'next/image'

export default function RegisterPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto p-8 flex">
        <div className="w-1/4 pr-4 border-r flex align-middle mr-10">
          <Image src="./next.svg" height={250} width={250} alt='logo'/>
        </div>
        <div className="w-3/4 p-20 bg-white rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>
          <form>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-2 border rounded-md outline-none focus:border-teal-500 text-black"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                className="w-full p-2 border rounded-md outline-none focus:border-teal-500 text-black"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600"
            >
              Register
            </button>
          </form>
          <div className='text-black pt-5 flex justify-evenly uppercase'>
            <div><a href='/' >Login</a></div>
            <div><a href='/rider-login'>Rider Login</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
