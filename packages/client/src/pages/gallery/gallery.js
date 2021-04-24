import DappLib from "@decentology/dappstarter-dapplib";
import DOM from "../../components/dom";
import "../../components/action-card.js";
import "../../components/action-button.js";
import "../../components/text-widget.js";
import "../../components/number-widget.js";
import "../../components/account-widget.js";
import "../../components/upload-widget.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElement, html, customElement, property } from "lit-element";
import axios from "axios";

@customElement("gallery-page")
export default class GalleryPage extends LitElement {
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
  @property()
  nfts;

  createRenderRoot() {
    return this;
  }
  constructor(args) {
    super(args);
    this.nfts = [];
  }

  getNFTs() {
    return this.nfts;
  }

  handleClick = e => {
    console.log('handleClick', e);
    if (!e || !e.detail || !e.detail.info || !e.detail.info.result) {
      console.log('oops', e);
      return;
    }
    if (e.detail.info.result.length === 0) {
      console.log('No Items');
    }

    const result = e.detail.info.result;
    const tokenIDs = result.map(res => res[0]);
    
    const execute = async() => {
      const chunkArray = (arr, size) => arr.reduce((newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]), []);
      this.nfts = [];
      for (const chunk of chunkArray(tokenIDs, 5)) {
    
        const tasks = chunk.map(tokenID => {
          return new Promise((resolve, reject) => {
            const objectId = tokenID;
            const metadataUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
            axios.get(metadataUrl).then(res => {
              try {
                const originalMetadata = res.data;
                console.log({originalMetadata});
                const metadata = {
                    metadataUrl: metadataUrl,
                    title: originalMetadata.title || '',
                    artistDisplayName: originalMetadata.artistDisplayName || '',
                    objectDate: originalMetadata.objectDate || '',
                    imageUrl: originalMetadata.primaryImageSmall || originalMetadata.primaryImage || '',
                    externalUrl: originalMetadata.objectURL
                };
                return resolve(metadata);
              } catch (e) {
                console.log(e);
                return reject(e);
              }
            });
          });
        });
        const metadataArray = await Promise.all(tasks);
        console.log({metadataArray})
        this.nfts = this.nfts.concat(metadataArray);
      }

      // // Test Data
      // this.nfts = [
      //   {
      //     title: "A Basket of Clams",
      //     artistDisplayName: 'Winslow Homer',
      //     objectDate: '1873',
      //     imageUrl: 'https://images.metmuseum.org/CRDImages/ep/web-large/DT1967.jpg',
      //     externalUrl: 'https://www.metmuseum.org/art/collection/search/12388'
      //   },
      //   {
      //     title: "A Basket of Clams",
      //     artistDisplayName: 'Winslow Homer',
      //     objectDate: '1873',
      //     imageUrl: 'https://images.metmuseum.org/CRDImages/ad/web-large/DT2054.jpg',
      //     externalUrl: 'https://www.metmuseum.org/art/collection/search/12388'
      //   }
      // ];
      console.log(this.nfts)
      this.requestUpdate();
    };
    execute();
  };

  render() {
    let content = html`
      <div class="container m-auto">
        <div class="shadow rounded-md bg-white mb-10 p-1">
        <div class="text-white p-3 bg-gray-500 flex justify-between items-center rounded-md rounded-b-none">
          <h5 class="font-bold">🖼 View Gallery</h5>
        </div>

        <div class="p-2 flex items-center justify-between">
          <div class="slot" id="card-body-getIDs">
            <account-widget
              field="account"
              label="Account"
              placeholder="Account address"
            >
          </div>
          <div class="button-container text-right">
            <action-button
              source="#card-body-getIDs"
              action="getIDs"
              method="get"
              fields="account"
              text="View"
              return="${null}"
              .click=${this.handleClick}
            />
          </div>
        </div>
      </div>

      <div class="mb-10">
        <ul class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${this.getNFTs().map(nft =>
          html`<li class="col-span-1 bg-white rounded-lg shadow">
                <div class="flex flex-col items-center p-6 h-full">
                  <div class="font-bold text-xl mb-2">${nft.title}</div>
                  <p class="text-gray-700 text-base mb-3">${nft.artistDisplayName ? nft.artistDisplayName + ', ' : '' }${nft.objectDate}</p>
                  <img src="${nft.imageUrl}" alt="" style="width: auto; height: auto; max-width: 100%; max-height: 100%;">
                  <div class="flex flex-row flex-grow mt-4">
                    <a
                      target="_blank"
                      href=${nft.externalUrl}
                      class="self-end text-gray-600 py-2 px-8 rounded bg-white-500 hover:bg-gray-200"}"
                    >
                      View Detail
                    </a>
                  </div>
                </div>
              </li>`)
        }
        </ul>
      </div>
    `; 
    return content;

  }
}
