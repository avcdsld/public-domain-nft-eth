import DappLib from "@decentology/dappstarter-dapplib";
import DOM from "../components/dom";
import "../components/action-card.js";
import "../components/action-button.js";
import "../components/text-widget.js";
import "../components/number-widget.js";
import "../components/account-widget.js";
import "../components/upload-widget.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("dapp-page")
export default class DappPage extends LitElement {
  @property()
  get;
  @property()
  post;
  @property()
  title;
  @property()
  category;
  @property()
  description;

  createRenderRoot() {
    return this;
  }
  constructor(args) {
    super(args);
  }


  render() {
    let content = html`
    <div class="container m-auto">
      <div class="row fadeIn mt-3 p-2 block">
        <h2 class="text-6xl">🖼 Public Domain NFTs</h2>
        <p class="mt-3">
        How cool would it be to own a public domain artwork as an NFT? In the digital space, the value and use cases are endless.
        </p>
        <p class="mt-3">
          With this service, you can get your own NFT of public domain artworks that can be searched at the Metropolitan Museum of Art.
        </p>

        <h3 class="mt-3 text-3xl">🔰 Usage</h3>
        <ul class="mt-3 ml-5 list-decimal">
          <li class="mt-3">Let's open Create tab ↗ and see how to create an NFT.</li>
          <li class="mt-3">In Gallery tab ↗, you can see a list of the works selected by you and other users.</i></li>
        </ul>
        <p class="mt-3">
          ℹ This site is a pilot and is currently running on the Flow Blockchain Emulator.
        </p>

        <p class="mt-12">
          Creator: <a target="_blank" href="https://twitter.com/arandoros">@arandoros</a>
        </p>
        <p class="mt-3">
          GitHub: <a target="_blank" href="https://github.com/avcdsld/public-domain-nft-eth">https://github.com/avcdsld/public-domain-nft-eth</a>
        </p>
        <p class="mt-3">
          Powered by <a target="_blank" href="https://www.decentology.com/">Decentology</a> and <a target="_blank" href="https://metmuseum.github.io/">The Metropolitan Museum of Art Collection API</a>
        </p>
      </div>
    </div>
    `;
    return content;

  }
}
