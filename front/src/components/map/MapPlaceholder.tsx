import { MapPin } from 'lucide-react';

export const MapPlaceholder = () => {
  const handleOpenMap = () => {
    const query = encodeURIComponent("charity organizations near me that accept food donations");
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleOpenMap}
      className="cursor-pointer border rounded-lg overflow-hidden bg-gray-50 h-[400px] flex flex-col items-center justify-center hover:shadow-md transition-shadow"
    >
      <div className="text-center p-6">
        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <MapPin size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Find Nearby Charities</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md">
          Click here to open Google Maps and view charity organizations near you that are ready to receive donated food.
        </p>
      </div>
    </div>
  );
};
