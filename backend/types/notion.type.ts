import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';

export type NotionBlock = Extract<
  GetBlockResponse,
  {
    type: string;
  }
>;

export class NotionPostBlock {
  blockId: string;
  title: string;
  constructor(blockId: string, title: string) {
    this.blockId = blockId;
    this.title = title;
  }
}
