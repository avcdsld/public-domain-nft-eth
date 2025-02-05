import DappLib from "@decentology/dappstarter-dapplib";
import "./wait-widget";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElement, html, customElement, property } from "lit-element";
@customElement("action-card")
export default class ActionCard extends LitElement {
  @property({ type: String })
  action = null;
  @property({ type: String })
  method = null;
  @property({ type: String })
  fields = null;
  @property({ type: String })
  text = null;
  @property({ type: String })
  message = null;
  @property({ type: String })
  return = null;
  @property({ type: String })
  target = null;
  @property({ type: String })
  description = null;

  createRenderRoot() {
    return this;
  }

  constructor(args) {
    super(args);
    const children = [...this.children];
    setTimeout(() => {
      for (let index = 0; index < children.length; index++) {
        const element = children[index];
        this.querySelector(".slot").append(element);
      }
    }, 0);

    this.clicked = false;
    if (!this.id) {
      this.id =
        "x" +
        Math.random()
          .toString(36)
          .substr(2, 9);
    }
  }

  handleClick = e => {
    if (this.action) {
      let resultPanel = document.getElementById("resultPanel");
      if (e.detail.info.type === DappLib.DAPP_RESULT_ERROR) {
        resultPanel.prepend(e.detail.node);
        resultPanel.open();
      } else {
        if (this.method === "get" || this.method === 'post') {
          let existing = this.querySelectorAll(
            `#card-body-result-${this.action} .note`
          );
          existing.forEach(el => el.setAttribute("style", "opacity:0.5;"));
          this.querySelector(`#card-body-result-${this.action}`).append(e.detail.node);
        } else {
          if (this.target) {
            let targetPanel = document.getElementById(this.target);
            targetPanel.prepend(e.detail.node);
          } else {
            resultPanel.prepend(e.detail.node);
            resultPanel.open();
          }
        }
      }
    }
  };

  render() {
    return html`
      <div class="shadow rounded-md bg-white mt-10 p-1">
        <div
          class="text-white p-3 bg-gray-500 flex justify-between items-center rounded-md rounded-b-none"
        >
          <h5 class="font-bold">${this.title}</h5>
        </div>
        <div class="p-2 flex items-center justify-between">
          <div class="slot" id="card-body-${this.action}"></div>
            <div class="button-container text-right">
              <action-button
                source="#${this.id}"
                action="${this.action}"
                method="${this.method}"
                fields="${this.fields || ""}"
                text="${this.text || ""}"
                return="${this.return}"
                .click=${this.handleClick}
              />
          </div>
        </div>
      </div>

      <div id="card-body-result-${this.action}"></div>
    `;
  }
}
