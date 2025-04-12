import Title from '../components/Title';
import { ShieldCheck, Truck, RefreshCw } from 'lucide-react';

function OurPolicy() {
  const policies = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
      title: 'Secure Borrowing',
      description: 'Your data and borrowed books are always protected and safe with us.',
    },
    {
      icon: <Truck className="h-10 w-10 text-blue-600" />,
      title: 'Fast Delivery',
      description: 'Get your books delivered quickly to your doorstep or ready for pickup.',
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-blue-600" />,
      title: 'Easy Returns',
      description: 'Returning books is easy and hassle-free with our flexible return policy.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Title text="Our Policy" icon="📖" />

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              {policy.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{policy.title}</h3>
              <p className="text-gray-600 mt-2">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurPolicy;
