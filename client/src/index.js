import React from "react"
import { hydrate, render } from "react-dom"
import App from "components/App"
import * as serviceWorker from "serviceWorker"

function onUpdate(registration) {
  window.dispatchEvent(new CustomEvent("update", { detail: registration.waiting }))
}

const rootElement = document.getElementById("root");

if (process.env.NODE_ENV === "production" && rootElement.hasChildNodes()) {
  const styles = Array.from(document.getElementsByTagName("style"))
  hydrate(<App />, rootElement, () => styles.forEach(style => style.remove()));
  serviceWorker.register({ onUpdate })
} else {
  render(<App />, rootElement);
}