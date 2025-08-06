// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-sm py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p>© {new Date().getFullYear()} Odiscom LLC. All rights reserved.</p>
        </div>
        <div className="text-center">
          <p>2600 S. Shore Blvd., Suite 300, League City, TX 77573</p>
          <p>Email: jeff@odiscom.com | Phone: (214) 392-3490</p>
        </div>
      </div>
    </footer>
  );
}