import type { PageServerLoad } from './$types';
type AddressFieldData =any
type GeolocationData = any;
/**
 * Capitalize each word of a string
 *
 * @param text the string
 * @returns capitalized string
 */
const toTitleCase = (text: string): string => {
	return text
		.toLowerCase()
		.split(' ')
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join(' ');
};

/**
 * ;^)
 *
 * @param headers all the incoming headers
 * @param key the key of the value you want to get
 * @returns the value of the key or undefined
 */
const getHead = (headers: Headers, key: string): string | undefined => {
	const head = headers.get(key);
	return head ?? undefined;
};

/**
 * Uses vercel
 * https://vercel.com/docs/concepts/edge-network/headers#request-headers
 *
 * NB: this will not work on localhost
 *
 * @param headers The request headers
 * @returns GeolocationData
 */
const getGeolocation = (headers: Headers): GeolocationData => {
	const city = getHead(headers, 'x-vercel-ip-city');

	// https://cloud.google.com/functions/docs/reference/headers
	const address: AddressFieldData = {
		city: city && toTitleCase(city),
		countryCode: getHead(headers, 'x-vercel-ip-country'),
		regionCode: getHead(headers, 'x-vercel-ip-country-region'),
	};

	const geoLocationData: GeolocationData = {
		address,
		ip: getHead(headers, 'x-real-ip'),
	};
	const latitude = getHead(headers, 'x-vercel-ip-latitude');
	const longitude = getHead(headers, 'x-vercel-ip-longitude');
	if (latitude && longitude) {
		geoLocationData.position = {
			latitude: Number.parseFloat(latitude),
			longitude: Number.parseFloat(longitude),
		};
	}

	return geoLocationData;
};

export const load: PageServerLoad = async (event) => {
	const {  request } = event;
	const headers = request.headers;
	const location = getGeolocation(headers);

	return {
        location
	};
};
