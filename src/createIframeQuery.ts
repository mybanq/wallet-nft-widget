import { ECOMMERCE_BANQ_NFT_refreshToken, IframeEvents } from './constants';

export const createIframeQuery = ({
	platformId,
}: {
	platformId: string;
}) => ({
	refreshToken: localStorage.getItem(ECOMMERCE_BANQ_NFT_refreshToken),
	settings: localStorage.getItem(IframeEvents.settings),
	origin: window.location.origin,
	windowWidth: window.innerWidth,
	windowHeight: window.innerHeight,
	appConfig: JSON.stringify({
		platformId,
  	}),
});
