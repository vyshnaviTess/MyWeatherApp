import { fetchCities } from './cityService';
import { ACCESS_TOKEN } from '../Utils/constants';

global.fetch = jest.fn();

describe('fetchCities', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an array of cities when fetch is successful', async () => {
        const mockResponse = {
            features: [
                { id: 'city1', place_name: 'City 1', geometry: { coordinates: [10.0, 20.0] } },
                { id: 'city2', place_name: 'City 2', geometry: { coordinates: [30.0, 40.0] } },
            ],
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await fetchCities('City');

        expect(fetch).toHaveBeenCalledWith(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/City.json?access_token=${ACCESS_TOKEN}`
        );
        expect(result).toEqual([
            { id: 'city1', place_name: 'City 1', latitude: 20.0, longitude: 10.0 },
            { id: 'city2', place_name: 'City 2', latitude: 40.0, longitude: 30.0 },
        ]);
    });

    it('should handle fetch failure', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchCities('Unknown City')).rejects.toThrow('Network error');
    });

    it('should return an empty array if no cities are found', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ features: [] }),
        });

        const result = await fetchCities('NonExistentCity');
        expect(result).toEqual([]);
    });
});
