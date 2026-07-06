const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white flex items-center justify-around px-4 py-3'>
      <div className=' logo text-2xl font-bold'>
        <span className='text-green-500'>&lt;</span>
        Pass
        <span className='text-green-500'>X/&gt;</span>
      </div>
    <button
        className='inline-flex items-center gap-2 rounded-full border border-green-500 bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-400 hover:shadow-md'
      >
        <img className='h-5 w-5 invert' src='/icons/github.svg' alt='GitHub' />
        <span>GitHub</span>
          </button>
    </nav>
  )
}

export default Navbar