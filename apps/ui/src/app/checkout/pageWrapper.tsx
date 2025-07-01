"use client";

import dynamic from "next/dynamic";

const Root = dynamic(() => import("@/checkout/Root").then((m) => m.Root), { ssr: false });

export const RootWrapper = ({ ecApiUrl }: { ecApiUrl: string }) => {
	if (!ecApiUrl) {
		return null;
	}
	return <Root ecApiUrl={ecApiUrl} />;
};
