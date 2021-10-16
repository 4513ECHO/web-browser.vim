import { Denops } from "./deps.ts";

type NewBufType = "new" | "enew" | "vnew";

export const createBuffer = async (
  denops: Denops,
  bufname: string,
  newbuftype: NewBufType,
): Promise<string> => {
  await denops.cmd(`${newbuftype} ${bufname}`);
  await denops.cmd("setlocal buftype=nofile bufhidden=hide noswapfile");
  await denops.cmd("set filetype=dwb");
  return bufname;
};

export const normalizeURL = (url: string): string => {
  // const prefix: string = url.startsWith(/https?:///) ? "" : "https://";
  // const body: string = url.endsWith("/") ? url.slice(0, -1) : url;
  // const result: string = prefix + body;
  // return result;
  return url;
};

export const varType = (x: any): string => {
  return `${typeof (x)} ${Object.prototype.toString.call(typeof (x))}`;
};
