"use client";

import { ECAuthProvider, useAuthChange } from "@ec/auth-sdk/react";
import { invariant } from "ts-invariant";
import { createECAuthClient } from "@ec/auth-sdk";
import { useState, type ReactNode } from "react";
import {
	type Client,
	Provider as UrqlProvider,
	cacheExchange,
	createClient,
	dedupExchange,
	fetchExchange,
} from "urql";

const ecApiUrl = process.env.NEXT_PUBLIC_EC_API_URL;
invariant(ecApiUrl, "Missing NEXT_PUBLIC_EC_API_URL env variable");

export const ecAuthClient = createECAuthClient({
	ecApiUrl,
});

const makeUrqlClient = () => {
	return createClient({
		url: ecApiUrl,
		suspense: true,
		// requestPolicy: "cache-first",
		fetch: (input, init) => ecAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
		exchanges: [dedupExchange, cacheExchange, fetchExchange],
	});
};

export function AuthProvider({ children }: { children: ReactNode }) {
	invariant(ecApiUrl, "Missing NEXT_PUBLIC_EC_API_URL env variable");

	const [urqlClient, setUrqlClient] = useState<Client>(() => makeUrqlClient());
	useAuthChange({
		ecApiUrl,
		onSignedOut: () => {
			setUrqlClient(makeUrqlClient());
		},
		onSignedIn: () => {
			setUrqlClient(makeUrqlClient());
		},
	});

	return (
		<ECAuthProvider client={ecAuthClient}>
			<UrqlProvider value={urqlClient}>{children}</UrqlProvider>
		</ECAuthProvider>
	);
}
