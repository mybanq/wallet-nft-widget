declare global {
	interface Window {
		ecommerceBanqWidget: any;
	}
}

declare interface NftWalletWidgetDialogElement extends HTMLDivElement {}

interface LinkNftWalletButtonAttributes
	extends React.HTMLAttributes<HTMLButtonElement> {
	class?: string;
	loading?: boolean;
	disabled?: boolean;
	error?: boolean;
	environment?: "development" | "integration" | "sandbox" | "production";
}

interface NftWalletWidgetDialogAttributes
	extends React.HTMLAttributes<NftWalletWidgetDialogElement> {
	ref?: RefObject<NftWalletWidgetDialogElement>;
	open?: boolean;
	environment?: "development" | "integration" | "sandbox" | "production";
	platformId: string;
}

declare namespace JSX {
	interface IntrinsicElements {
		"link-nft-widget-dialog": NFTWalletWidgetDialogAttributes;
		"link-nft-banq-button": PayWithBanqButtonAttributes;
		"my-element": any;
	}
}

declare namespace global {
	interface HTMLElementTagNameMap {
		"link-nft-widget-dialog": any;
		"link-nft-banq-button": any;
	}
}
