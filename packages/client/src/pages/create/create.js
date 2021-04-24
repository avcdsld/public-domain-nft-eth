import "../../components/page-panel.js";
import "../../components/page-body.js";
import "../../components/action-card.js";
import "../../components/account-widget.js";
import "../../components/text-widget.js";
import "../../components/number-widget.js";
import DappLib from "@decentology/dappstarter-dapplib";
import { LitElement, html, customElement, property } from "lit-element";

@customElement('create-page')
export default class CreatePage extends LitElement {
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
      <page-body>
        <action-card
          title="🖼 Create Public Domain NFT"
          description="Mint new NFT for Account"
          action="mintPublicDomainNFT"
          method="post"
          fields="account url"
          text="Create"
        >
          <account-widget
            field="account"
            label="Account"
            placeholder="Account address"
          >
          </account-widget>
          <text-widget
            field="url"
            label="URL"
            placeholder="URL of metmuseum.org"
          >
          </text-widget>
        </action-card>

        <action-card
          title="🔍 Get NFT IDs"
          description="Get NFT IDs for Account"
          action="getIDs"
          method="get"
          fields="account"
          text="Get"
        >
          <account-widget
            field="account"
            label="Account"
            placeholder="Account address"
          >
          </account-widget>
        </action-card>

        <!--
          <action-card
            title="⚠ Delete Account Collection"
            description="Delete all NFTs in the collection for Account"
            action="initializeAccount"
            method="post"
            fields="account"
            text="Delete"
          >
            <account-widget
              field="account"
              label="Account"
              placeholder="Account address"
            >
            </account-widget>
          </action-card>
        -->

      </page-body>
      <page-panel id="resultPanel"></page-panel>
    `;

    return content;
  }
}

