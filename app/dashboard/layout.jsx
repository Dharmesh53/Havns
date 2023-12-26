import Link from 'next/link'
const layout = ({ children }) => {
  return (
    <div className="block">
      Dashboard
      <div className='flex gap-5 justify-center text-lg'>
        <button>
          <Link href="/dashboard/booking">booking</Link>
        </button>
        <button>
          <Link href="/dashboard/halls">halls</Link>
        </button>
        <button>
          <Link href="/dashboard/listing">listing</Link>
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
