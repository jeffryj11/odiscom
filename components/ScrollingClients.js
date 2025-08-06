// components/ScrollingClients.js
export default function ScrollingClients() {
  return (
    <div className="bg-white py-10">
      <h2 className="text-center text-lg font-semibold text-gray-800 mb-8">Our Partners</h2>
      <div className="overflow-hidden">
        <div className="flex animate-marquee space-x-16 px-8 items-center">
          <img src="/logos/smartlink.png" alt="Smartlink" className="h-12 object-contain" />
          <img src="/logos/nextlink.png" alt="Nextlink" className="h-12 object-contain" />
          <img src="/logos/zayo.png" alt="Zayo" className="h-12 object-contain" />
          <img src="/logos/atandt.png" alt="AT&T" className="h-12 object-contain" />
          <img src="/logos/tds.png" alt="TDS" className="h-12 object-contain" />
          <img src="/logos/ebi.png" alt="EBI" className="h-12 object-contain" />
          <img src="/logos/crown.png" alt="Crown" className="h-12 object-contain" />
          <img src="/logos/nexius.png" alt="Nexius" className="h-12 object-contain" />
          <img src="/logos/squan.png" alt="Squan" className="h-12 object-contain" />
          <img src="/logos/trylon.png" alt="Trylon" className="h-12 object-contain" />
          <img src="/logos/flatwireless.png" alt="Flat Wireless" className="h-12 object-contain" />
          <img src="/logos/triforce.png" alt="Triforce" className="h-12 object-contain" />
        </div>
      </div>
    </div>
  );
}