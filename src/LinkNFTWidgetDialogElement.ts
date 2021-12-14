import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LinkNFTEnvironment } from './constants';
import './LinkNFTWidgetElement';
import {isMobileDevice} from './utils';

@customElement('link-nft-widget-dialog')
export class LinkNFTWidgetDialogElement extends LitElement {
	static styles = css`
		.modal {
			display: flex;
			background: rgba(0, 0, 0, 0.3);
			z-index: 5;
			overflow: scroll;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			align-items: center;
			justify-content: center;
		}
		.modal--closed {
			display: none;
		}
	`;
	@property()
	environment: LinkNFTEnvironment = LinkNFTEnvironment.sandbox;

	@property()
	platformId: string;

	@property({ type: Boolean })
	open: boolean;

	// for some reason open does not re-render on property change
	attributeChangedCallback(
		name: string,
		_old: string | null,
		value: string | null
	) {
		super.attributeChangedCallback(name, _old, value);
		if (name === "open" && value === "false") {
			this.open = false;
			this.requestUpdate();
		}
	}

	renderWidget() {
		return html`<link-nft-widget
			platformId="${this.platformId}"
			environment="${this.environment}"
			style="${isMobileDevice() ? 'height: 100%;' : ''}"
		></link-nft-widget>`;
	}

	render() {
		return html`
			<div class=${this.open ? "modal" : "modal--closed"}>
				${this.open && this.renderWidget()}
			</div>
		`;
	}
}
