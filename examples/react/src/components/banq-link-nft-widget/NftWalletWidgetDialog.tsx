import React, { useCallback, useRef } from "react";
import { useEventEffect } from "./hooks";

export enum NftWalletEnvironment {
	development = "development",
	integration = "integration",
	sandbox = "sandbox",
	production = "production",
}

interface Props {
	isOpen?: boolean;
	platformId: string;
	environment: keyof typeof NftWalletEnvironment;
	onClose?: () => void;
	onPaymentSuccess?: () => void;
}

export const NftWalletWidgetDialog = ({
	isOpen,
	environment,
	onClose,
	onPaymentSuccess,
	platformId,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	const handleClose = useCallback(() => onClose?.(), [onClose]);

	const handlePaymentSuccess = useCallback(
		() => onPaymentSuccess?.(),
		[onPaymentSuccess]
	);

	useEventEffect(ref, "close", handleClose);

	useEventEffect(ref, "paymentSuccess", handlePaymentSuccess);

	return (
		<link-nft-widget-dialog
			ref={ref}
			open={isOpen}
			environment={environment}
			platformId={platformId}
		/>
	);
};
