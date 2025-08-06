// components/ScrollingClients.js
export default function ScrollingClients() {
  return (
    <div className="bg-white py-8">
      <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">Our Partners</h2>
      <div className="overflow-hidden whitespace-nowrap animate-marquee flex items-center space-x-16 px-4">
        <img src="/logos/sonic.png" alt="SONIC" className="h-12 inline-block object-contain" />
        <img src="/logos/smartlink.png" alt="Smartlink" className="h-12 inline-block object-contain" />
        <img src="/logos/nextlink.png" alt="Nextlink" className="h-12 inline-block object-contain" />
        <img src="/logos/zayo.png" alt="Zayo" className="h-12 inline-block object-contain" />
        <img src="/logos/atandt.png" alt="AT&T" className="h-12 inline-block object-contain" />
        <img src="/logos/tds.png" alt="TDS" className="h-12 inline-block object-contain" />
        <img src="/logos/ebi.png" alt="EBI" className="h-12 inline-block object-contain" />
        <img src="/logos/crown.png" alt="Crown" className="h-12 inline-block object-contain" />
        <img src="/logos/nexius.png" alt="Nexius" className="h-12 inline-block object-contain" />
        <img src="/logos/squan.png" alt="Squan" className="h-12 inline-block object-contain" />
        <img src="/logos/trylon.png" alt="Trylon" className="h-12 inline-block object-contain" />
        <img src="/logos/flatwireless.png" alt="Flat Wireless" className="h-12 inline-block object-contain" />
        <img src="/logos/triforce.png" alt="Triforce" className="h-12 inline-block object-contain" />
      </div>
    </div>
  );
}