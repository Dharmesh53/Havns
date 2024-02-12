import Link from "next/link";
const layout = ({ children }) => {
  return (
    <div className="block">
      Control Panel
      <div className="flex gap-5 justify-center text-lg">
        <button>
          <Link href="/protected/controlpanel/booked">booked</Link>
        </button>
        <button>
          <Link href="/protected/controlpanel/meeting">Virtual meetings</Link>
        </button>
        <button>
          <Link href="/protected/controlpanel/account">account settings</Link>
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
