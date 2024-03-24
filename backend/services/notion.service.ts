import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import { Client } from '@notionhq/client';
import { BLOCK_TYPE } from '../constants/notion.constant';
import { NotionBlock, NotionPostBlock } from '../types/notion.type';

const parsePages = (pages: any[]): NotionPostBlock[] => {
  return pages
    .filter((result) => result.type === BLOCK_TYPE.CHILD_PAGE)
    .map((result) => new NotionPostBlock(result.id, result[result.type].title));
};

export class NotionService {
  private notionApiKey: string;
  private rootPageId: string;

  constructor() {
    const notionApiKey = process.env.NEST_NOTION_API_KEY;
    const rootPageId = process.env.NEST_ROOT_PAGE_ID;

    if (!notionApiKey || !rootPageId)
      throw new Error('Notion API key or root page ID is not defined.');

    this.notionApiKey = notionApiKey;
    this.rootPageId = rootPageId;
  }

  getNotionPostBlocks() {
    const notion = new Client({
      auth: this.notionApiKey,
    });

    return notion.blocks.children
      .list({ block_id: this.rootPageId })
      .then((response) => parsePages(response.results));
  }

  getNotionPost({ blockId, title }: NotionPostBlock) {
    const notion = new Client({
      auth: this.notionApiKey,
    });

    return notion.blocks.children
      .list({
        block_id: blockId,
      })
      .then((response) => {
        const results = response.results as NotionBlock[];
        const parser = NotionBlocksHtmlParser.getInstance();

        return {
          createdAt: results[0].created_time,
          lastModefiedAt: results[0].last_edited_time,
          title: title,
          content: parser.parse(results),
        };
      });
  }
}
