
import { MapPin } from 'lucide-react';

export const MapPlaceholder = () => {
  return (
    <div className="border rounded-lg overflow-hidden bg-gray-50 h-[400px] flex flex-col items-center justify-center">
      <div className="text-center p-6">
        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <MapPin size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Map Integration</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md">
          In a production environment, this would display an interactive map showing the locations of nearby food donations and charities.
        </p>
      </div>
    </div>
  );
};
