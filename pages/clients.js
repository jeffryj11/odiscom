const clients = ['AT&T', 'EBI Consulting', 'Smartlink', 'SONIC', 'Verizon Wireless', 'Zayo', 'Nexius', 'Squan', 'TDS Telecom'];

export default function Clients() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Clients</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div key={client} className="border p-4 text-center rounded shadow-sm bg-white">
            {client}
          </div>
        ))}
      </div>
    </div>
  );
}