import { createECAuthClient } from "@ec/auth-sdk";
import { getNextServerCookiesStorageAsync } from "@ec/auth-sdk/next/server";
import { invariant } from "ts-invariant";

export const ProductsPerPage = 12;

const ecApiUrl = process.env.NEXT_PUBLIC_EC_API_URL;
invariant(ecApiUrl, "Missing NEXT_PUBLIC_EC_API_URL env variable");

export const getServerAuthClient = async () => {
	const nextServerCookiesStorage = await getNextServerCookiesStorageAsync();
	return createECAuthClient({
		ecApiUrl,
		refreshTokenStorage: nextServerCookiesStorage,
		accessTokenStorage: nextServerCookiesStorage,
	});
};
