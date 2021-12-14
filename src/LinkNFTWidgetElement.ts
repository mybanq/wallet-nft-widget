import { css, html, LitElement } from "lit";
import qs from "qs";
import { customElement, property, query } from "lit/decorators.js";
import { createIframeQuery } from "./createIframeQuery";
import {
	LinkNFT,
	LinkNFTEnvironment,
	IframeEvents,
	ECOMMERCE_BANQ_NFT_refreshToken,
	ECOMMERCE_BANQ_NFT_settings,
} from "./constants";
import { appendStyle } from "./utils";

export type LoginPostMessagePayload = {
	refreshToken: string;
};

const environmentUrls = {
	development: "//stwltnftwdgbqdeus01.z13.web.core.windows.net/",
	integration: "//stwltnftwdgbqieus01.z13.web.core.windows.net/",
	sandbox: "//walletnft-widget.sandbox.banq.com/",
	production: "//walletnft-widget.banq.com/",
};

@customElement("link-nft-widget")
export class LinkNFTWidgetElement extends LitElement {
	static styles = css`
		iframe {
			border: none;
		}
	`;

	@property()
	environment: LinkNFTEnvironment = LinkNFTEnvironment.sandbox;

	@property()
	platformId: string;

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener("message", (event) => this.handleMessage(event));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("message", this.handleMessage);
	}

	handleMessage(event: MessageEvent<LinkNFT>) {
		const action = event.data;
		this.dispatchEvent(
			new CustomEvent(action.type, {
				detail: event.data,
				bubbles: true,
				composed: true,
			})
		);

		if (action.type === IframeEvents.styles) {
			appendStyle(this.iframe, action.payload as Record<string, string>);
		}

		if (action.type === IframeEvents.login) {
			const loginPayload = action.payload as LoginPostMessagePayload;
			if (!loginPayload.refreshToken) {
				localStorage.removeItem(IframeEvents.settings);
				localStorage.removeItem(ECOMMERCE_BANQ_NFT_refreshToken);
				this.dispatchEvent(
					new CustomEvent("close", {
						detail: event.data,
						bubbles: true,
						composed: true,
					})
				);
				this.requestUpdate();
			} else {
				localStorage.setItem(
					ECOMMERCE_BANQ_NFT_refreshToken,
					(action.payload as LoginPostMessagePayload).refreshToken
				);
			}
		}

		if (action?.type === IframeEvents.settings) {
			const payload = action.payload as string;
			localStorage.setItem(ECOMMERCE_BANQ_NFT_settings, payload);
		}

		if (action?.type === IframeEvents.close) {
			localStorage.removeItem(ECOMMERCE_BANQ_NFT_refreshToken);
			this.requestUpdate();
		}
	}

	@query("#link-nft-iframe")
	iframe!: HTMLIFrameElement;

	render() {
		const query = createIframeQuery({
			platformId: this.platformId,
		});
		const source =
			environmentUrls[this.environment] + "?" + qs.stringify(query);
		return html`<iframe
			id="link-nft-iframe"
			title="Link NFT Widget"
			src="${source}"
		></iframe> `;
	}
}
