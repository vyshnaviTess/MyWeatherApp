import { WEATHER_API_KEY } from '../Utils/constants';
import { getWeatherByCoordinates, getWeatherByCity, fetchWeatherForecast } from './weatherServices';

// Mock the global fetch function
global.fetch = jest.fn();

describe('Weather Services', () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mock calls
    });

    it('should fetch weather by coordinates', async () => {
        const mockResponse = {
            main: {
                temp: 20,
                humidity: 50,
            },
            weather: [{ description: 'clear sky' }],
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const latitude = 51.5074;
        const longitude = -0.1278;
        const result = await getWeatherByCoordinates(latitude, longitude);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        );
        expect(result).toEqual(mockResponse);
    });

    it('should fetch weather by city', async () => {
        const mockResponse = {
            main: {
                temp: 15,
                humidity: 30,
            },
            weather: [{ description: 'light rain' }],
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const city = 'London';
        const result = await getWeatherByCity(city);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        expect(result).toEqual(mockResponse);
    });

    it.skip('should fetch weather forecast', async () => {
        const mockResponse = {
            list: [
                { dt: 1622548800, main: { temp: 10 } }, // Day 1
                { dt: 1622635200, main: { temp: 12 } }, // Day 2
                { dt: 1622721600, main: { temp: 14 } }, // Day 3
                { dt: 1622808000, main: { temp: 16 } }, // Day 4
                { dt: 1622894400, main: { temp: 18 } }, // Day 5
                { dt: 1622980800, main: { temp: 20 } }, // Extra data not used
                { dt: 1623067200, main: { temp: 22 } },
            ],
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const city = 'London';
        const result = await fetchWeatherForecast(city, WEATHER_API_KEY);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        expect(result).toEqual([
            { dt: 1622548800, main: { temp: 10 } }, // Day 1
            { dt: 1622721600, main: { temp: 14 } }, // Day 3
            { dt: 1622894400, main: { temp: 18 } }, // Day 5
        ]);
    });

    it('should throw an error when fetching weather forecast fails', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found',
        });

        const city = 'InvalidCity';

        await expect(fetchWeatherForecast(city, WEATHER_API_KEY)).rejects.toThrow('Failed to fetch forecast data.');
    });
});
