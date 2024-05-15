# What It Is

This is the source code of [my blog](https://peter-byun.dev). <br />
It is built with Next.js and Notion API, and deployed to Vercel. <br />

## Commands

### Load Environment Variables

You need to setup Vercel CLI first before loading environment variables from Vercel.

```
vercel env pull
```

### Build

```
pnpm run build
```

### Develop

```
pnpm run dev
```

## Managing Packages

## Install dependencies

```sh
pnpm install
```

## Backend Operations

### Database Synchronization

When you deploy the API server, you need to make sure that the Database is updated because the data scheme of the ORM evolves over time.
And the below Prisma command does that.

```bash
prisma generate
```

But it only updates the schema rather than creating tables.
So you need to initialize the database if you are deploying the app for the first time. To do so, run the below command.

```bash
prisma migrate deploy
```

## Notion API Integration

### About the page ID

You can obtain the page ID from your Notion page by the instruction in the [Notion API documentation](https://developers.notion.com/docs/working-with-page-content#creating-a-page-with-content)

### How to share a page in Notion

You need to do two things:

- Create an integration in the Notion settings.
- Share the page you want to make public, and invite the integration that you created.

---

## Icon Sources

- <a href="https://www.flaticon.com/free-icons/back" title="back icons">Back icons created by Roundicons - Flaticon</a>
