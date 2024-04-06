import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import { Client } from '@notionhq/client';
import { BLOCK_TYPE } from '../constants/notion.constant';
import { NotionBlock, NotionPostBlock } from '../types/notion.type';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
      .then(async (response) => {
        const results = await convertNotionImageToS3Image(
          response.results as NotionBlock[]
        );

        const parser = NotionBlocksHtmlParser.getInstance();

        const post = await results[0];

        const resolvedResults = await Promise.all([...results]);

        return {
          createdAt: post.created_time,
          lastModefiedAt: post.last_edited_time,
          title: title,
          content: parser.parse(resolvedResults),
        };
      });
  }
}

const S3_URL = 'http://peter-byun.dev.s3-website-us-east-1.amazonaws.com';
const BUCKET_NAME = 'peter-byun.dev';
const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_KEY_ID ?? '',
    secretAccessKey: process.env.S3_ACCESS_KEY ?? '',
  },
});

function convertNotionImageToS3Image(blocks: NotionBlock[]) {
  return blocks.map(async (block) => {
    if (block.type !== 'image') {
      return block;
    }
    if (block.image.type !== 'file') {
      return block;
    }

    const imageName = getFilenameFromUrl(block.image.file.url);
    const imageUrl = `images/${imageName}`;

    const originalFileResponse = await fetch(block.image.file.url);
    const originalFileBuffer = await Buffer.from(
      await originalFileResponse.arrayBuffer()
    );

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: imageUrl,
        Body: originalFileBuffer,
      })
    );

    block.image.file.url = `${S3_URL}/${imageUrl}`;

    return block;
  });
}

function getFilenameFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  return pathname.substring(pathname.lastIndexOf('/') + 1);
}
