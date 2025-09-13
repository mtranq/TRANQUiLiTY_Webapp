import Navigation from '../components/Navigation';

export const metadata = {
  title: 'Contact',
  description: 'Reach TRANQUiLiTY for bookings, production or collaboration.'
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <div className="pt-24 min-h-screen px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact</h1>
          <div className="bg-gray-800/70 rounded-lg p-8 border border-gray-700/50">
            <p className="text-gray-300 leading-relaxed mb-4">
              The interactive email form has been removed.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              For bookings, production, collaboration or other inquiries, contact directly at:
            </p>
            <p className="text-lg font-semibold text-white mb-8 select-all">tranquilityvibe@gmail.com</p>
            <p className="text-sm text-gray-400">
              (No data is collected or sent from this page.)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
