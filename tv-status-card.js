const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

console.info(
  `%c TV-STATUS-CARD %c v1.0.0 `,
  "color: white; background: #555; font-weight: bold;",
  "color: white; background: #007acc; font-weight: bold;"
);

class TvStatusCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
    entity: {},
  };

  static styles = css`
    :host {
      --text-color: #53514B;
      --background-color: #DBDBDB;
      --shadow-color: rgba(162, 162, 162, 0.90);
      --border-color: rgba(0, 0, 0, 0.23);
    }

    .tv-status {
      width: 100%;
      max-width: 341px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 55px;
    }

    .card-item-status {
      width: 100%;
      padding-left: 59px;
      padding-right: 59px;
      padding-top: 15px;
      padding-bottom: 15px;
      background: var(--background-color);
      box-shadow: 1px 1px 3px var(--shadow-color);
      border-radius: 11px;
      outline: 1px var(--border-color) solid;
      outline-offset: -1px;
      justify-content: flex-start;
      align-items: center;
      gap: 51px;
      display: flex;
      transition: opacity 0.3s ease;
    }

    .card-item-status.off {
      opacity: 0.69;
    }

    .card-item-status:hover {
      cursor: pointer;
      transform: scale(1.02);
      box-shadow: 2px 2px 6px var(--shadow-color);
    }

    .icon {
      width: 66px;
      height: 66px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 7px;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-shrink: 0;
    }

    .icon svg {
      width: 54px;
      height: 54px;
    }

    .status-text {
      text-align: center;
      color: var(--text-color);
      font-size: 30px;
      font-family: Jaldi, sans-serif;
      font-weight: 400;
      word-wrap: break-word;
    }

    .error-message {
      color: #d32f2f;
      padding: 20px;
      border-radius: 4px;
      background: #ffebee;
      font-family: Roboto, sans-serif;
    }
  `;

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  render() {
    if (!this.hass) {
      return html`<div class="error-message">Home Assistant is not available</div>`;
    }

    const entity = this.hass.states[this.config.entity];

    if (!entity) {
      return html`<div class="error-message">
        Entity not found: ${this.config.entity}
      </div>`;
    }

    const isOn = entity.state === "on" || entity.state === "playing";
    const displayText = isOn ? "TV is ON" : "TV is OFF";

    return html`
      <div class="tv-status">
        <div
          class="card-item-status ${isOn ? "" : "off"}"
          @click=${this._handleToggle}
        >
          <div class="icon">
            ${isOn ? this._renderTvOnIcon() : this._renderTvOffIcon()}
          </div>
          <div class="status-text">${displayText}</div>
        </div>
      </div>
    `;
  }

  _renderTvOffIcon() {
    return html`
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M47.2352 10.125H6.76477C4.89265 10.125 3.375 11.6426 3.375 13.5148V35.4227C3.375 37.2948 4.89265 38.8125 6.76477 38.8125H47.2352C49.1073 38.8125 50.625 37.2948 50.625 35.4227V13.5148C50.625 11.6426 49.1073 10.125 47.2352 10.125Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <path
          d="M13.5 43.875H40.5Z"
          fill="currentColor"
        />
        <path
          d="M13.5 43.875H40.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
      </svg>
    `;
  }

  _renderTvOnIcon() {
    return html`
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M47.2352 40.5H6.76477C5.41871 40.4983 4.12826 39.9629 3.17645 39.0111C2.22464 38.0592 1.68917 36.7688 1.6875 35.4227V13.5148C1.68917 12.1687 2.22464 10.8783 3.17645 9.92645C4.12826 8.97464 5.41871 8.43917 6.76477 8.4375H47.2352C48.5813 8.43917 49.8717 8.97464 50.8236 9.92645C51.7754 10.8783 52.3108 12.1687 52.3125 13.5148V35.4227C52.3108 36.7688 51.7754 38.0592 50.8236 39.0111C49.8717 39.9629 48.5813 40.4983 47.2352 40.5Z"
          fill="currentColor"
        />
        <path
          d="M13.5 43.875H40.5Z"
          fill="currentColor"
        />
        <path
          d="M13.5 43.875H40.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
      </svg>
    `;
  }

  _handleToggle() {
    const entity = this.config.entity;
    const isOn = this.hass.states[entity].state === "on" || 
                 this.hass.states[entity].state === "playing";

    this.hass.callService("media_player", isOn ? "turn_off" : "turn_on", {
      entity_id: entity,
    });
  }

  getCardSize() {
    return 3;
  }

  static getConfigElement() {
    return document.createElement("tv-status-card-editor");
  }

  static getStubConfig() {
    return { entity: "" };
  }
}

if (!customElements.get("tv-status-card")) {
  customElements.define("tv-status-card", TvStatusCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tv-status-card",
  name: "TV Status Card",
  description: "A card to display and control the status of a TV media player",
  preview: true,
});
