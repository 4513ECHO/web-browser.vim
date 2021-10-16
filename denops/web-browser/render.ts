import { DOMParser, Element, HTMLCollection, HTMLDocument } from "./deps.ts";

export const createRenderedText = (html: string): string[] => {
  const element = parse(html);
  let renderedText: string[] = [];
  return render(renderedText, element);
}

const parse = (html: string): Element[] => {
  const document: HTMLDocument | null = new DOMParser().parseFromString(
    html,
    "text/html",
  )!;
  if (document === null) {
    throw new Error("HTML parse failed");
  }
  return Array.from(document.querySelector("body")!.children);
};

const render = (renderedText: string[], element: Element[] | Element): string[] => {
  if (!Array.isArray(element)) {
    renderedText.push(surroundTag(element));
    return renderedText;
  }
  // const hoge = element.map(e => render(renderedText, e))
  for (let i = 0; i < element.length; i++) {
    render(renderedText, element[i]);
  }
  return renderedText;
};

const surroundTag = (element: Element): string => {
  switch (element.tagName) {
    case "SCRIPT":
    case "STYLE":
      return "";
    // case "A":
    default:
      return `<dwb:${element.tagName}>${element.innerHTML}</dwb:${element.tagName}>`;
  }
};
