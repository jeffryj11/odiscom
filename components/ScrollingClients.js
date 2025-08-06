// components/ScrollingClients.js
export default function ScrollingClients() {
  return (
    <div className="overflow-hidden bg-gray-100 py-6">
      <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">Our Partners</h2>
      <div className="whitespace-nowrap animate-marquee flex space-x-12 px-4">
        <img src="/logos/sonic.png" alt="SONIC" className="h-12 inline-block" />
        <img src="/logos/smartlink.png" alt="Smartlink" className="h-12 inline-block" />
        <img src="/logos/nextlink.png" alt="Nextlink" className="h-12 inline-block" />
        <img src="/logos/zayo.png" alt="Zayo" className="h-12 inline-block" />
        <img src="/logos/atandt.png" alt="AT&T" className="h-12 inline-block" />
      </div>
    </div>
  );
}