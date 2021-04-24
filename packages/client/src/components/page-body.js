import DappLib from "@decentology/dappstarter-dapplib";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("page-body")
export default class PageBody extends LitElement {
  @property()
  category;
  @property()
  title;
  @property()
  description;

  constructor(args) {
    super(args);
    const children = [...this.children];
    setTimeout(() => {
      for (let index = 0; index < children.length; index++) {
        const element = children[index];
        this.querySelector(".slot").append(element);
      }
    }, 0);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    // return html`
    //   <section class="p-2 mb-12">
    //     <h5 class="text-gray-600">${this.category}</h5>

    //     <h2 class="mb-2 text-4xl text-gray-700">
    //       <strong>${this.title}</strong>
    //     </h2>
    //     <div class="">
    //       <div class="text-sm">
    //         ${this.description}
    //       </div>
    //     </div>
    //   </section>
    //   <div class="mt-4 slot"></div>
    // `;
    return html`
      <section class="p-2 mb-2">
        <h3 class="mt-3 text-3xl">🔰 How to create NFTs</h3>

        <ul class="mt-3 ml-5 list-decimal">
          <li class="mt-3">
            Visit
            <a target="_blank" href="https://www.metmuseum.org/art/collection/search#!?showOnly=openAccess" style="text-decoration: underline;">
              the Metropolitan Museum of Art website
            </a>
            to find open access artworks.
          </li>
            <ul class="mt-3 ml-5">
              <li class="mt-2">e.g. https://www.metmuseum.org/art/collection/search/438820</li>
              <li class="mt-1 ml-8">https://www.metmuseum.org/art/collection/search/459190</li>
              <li class="mt-1 ml-8">https://www.metmuseum.org/art/collection/search/337499</li>
            </ul>
          <li class="mt-3">In <i>Create Public Domain NFT</i> box, choose any account, enter <i>URL</i> of your chosen artwork, and then click <i>SUBMIT</i> button.</i></li>
        </ul>
      </section>
      <div class="mt-4 slot"></div>
    `;
  }
}
