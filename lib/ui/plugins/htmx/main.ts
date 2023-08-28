import { injectScript } from "../utils.ts";

export default function main() {
  injectScript({
    src: "https://unpkg.com/htmx.org@1.9.5",
    integrity:
      "sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO",
    crossorigin: "anonymous",
  });
}
