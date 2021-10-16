import { Denops, ensureString, ky } from "./deps.ts";
import { createBuffer, normalizeURL } from "./util.ts";
import { createRenderedText } from "./render.ts";

export const main = async (denops: Denops): Promise<void> => {
  denops.dispatcher = {
    async open(url: unknown): Promise<void> {
      ensureString(url);
      const URL: string = normalizeURL(url);
      const html: string = await ky.get(URL).text();
      const text: string[] = createRenderedText(html);
      await createBuffer(denops, `dwb:${URL}`, "vnew");
      await denops.call("setline", 1, text);
    },
  };

  await denops.cmd(
    `command! -nargs=1 Browse call denops#request('${denops.name}', 'open', [<q-args>])`,
  );
  await denops.cmd(
    `command! -nargs=1 Google call denops#request('${denops.name}', 'open', ['https://google.com/search?q=' .. <q-args>])`,
  );
};
