import React, { useState } from "react";
import {
	NftWalletWidgetDialog,
	LinkNftWalletButton,
} from "./banq-link-nft-widget";

export const ConnectButton = () => {
	const [isOpen, setOpen] = useState<boolean>();

	return (
		<>
			<LinkNftWalletButton disabled={isOpen} onClick={() => setOpen(true)} />
			<NftWalletWidgetDialog
				isOpen={isOpen}
				platformId="<PLATFORM_ID>"
				environment="sandbox"
				onClose={() => setOpen(false)}
				onPaymentSuccess={() => setOpen(false)}
			/>
		</>
	);
};
