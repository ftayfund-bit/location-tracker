import { useState } from 'react';
import { MapPin, Loader2, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocationService } from '@/services/locationService';
import { LocationData } from '@/types/location';
import { useToast } from '@/components/ui/use-toast';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface LocationCaptureProps {
  onLocationCaptured: (location: LocationData) => void;
}

export const LocationCapture = ({ onLocationCaptured }: LocationCaptureProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const { toast } = useToast();

  const handleGetLocation = async () => {
    setIsLoading(true);
    try {
      const location = await LocationService.getCurrentLocation();
      setCurrentLocation(location);
      onLocationCaptured(location);
      toast({
        title: "Location captured!",
        description: `${location.city || 'Unknown city'}, ${location.country || 'Unknown country'}`,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Location Error",
        description: error.message || "Failed to get location",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!currentLocation) return;
    // 1) Build a 2D array for the sheet:
    const data = [
      ['City', 'Country', 'Latitude', 'Longitude', 'Timestamp', 'Accuracy (m)'],
      [
        currentLocation.city || '',
        currentLocation.country || '',
        currentLocation.latitude,
        currentLocation.longitude,
        currentLocation.timestamp.toISOString(),
        currentLocation.accuracy ? Math.round(currentLocation.accuracy) : '',
      ],
    ];
    // 2) Convert to worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    // 3) Create a new workbook & append
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Location');
    // 4) Write to binary & trigger download
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'location.xlsx');
  };

  return (
    <Card className="bg-gradient-card shadow-card-custom border-0">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <MapPin className="h-6 w-6 text-location-primary" />
          Location Tracker
        </CardTitle>
        <CardDescription>
          Capture your current location and export to Excel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleGetLocation}
          disabled={isLoading}
          variant="location"
          size="lg"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Location...
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Get Current Location
            </>
          )}
        </Button>

        {currentLocation && (
          <>
            <div className="mt-6 p-4 bg-background/50 rounded-lg border space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Current Location</h4>
                <Badge variant="secondary" className="bg-location-success/10 text-location-success border-location-success/20">
                  Captured
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">City:</span>
                  <p className="text-foreground">{currentLocation.city || 'Unknown'}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Country:</span>
                  <p className="text-foreground">{currentLocation.country || 'Unknown'}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Coordinates:</span>
                  <p className="text-foreground font-mono text-xs">
                    {LocationService.formatCoordinates(currentLocation.latitude, currentLocation.longitude)}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Time:</span>
                  <p className="text-foreground">{currentLocation.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
              {currentLocation.accuracy && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3" />
                  Accuracy: ±{Math.round(currentLocation.accuracy)} meters
                </div>
              )}
            </div>

            {/* Export button */}
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
