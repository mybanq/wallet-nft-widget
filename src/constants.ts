export const ECOMMERCE_BANQ_NFT_refreshToken = '__ECOMMERCE_BANQ_NFT_refreshToken';
export const ECOMMERCE_BANQ_NFT_settings = '__ECOMMERCE_BANQ_NFT_settings';

export enum IframeEvents {
	styles = "styles",
	close = "close",
	login = "login",
	redirect = "redirect",
	successPayment = "successPayment",
	settings = "settings",
}

export enum LinkNFTEnvironment {
	development = "development",
	integration = "integration",
	sandbox = "sandbox",
	production = "production",
}

export interface LinkNFT<P = unknown> {
	type: IframeEvents;
	payload: P;
}
