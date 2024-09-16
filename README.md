# Peter Byun's Web Dev Blog

It's my blog/a playground for new tools, </br>
and I though it might be useful for someone who wants to build a blog using Notion APIs. </br>

### Tools Used
- Notion APIs
- Vercel
- Next.js App Router
- React 19

### Commands

#### Load Environment Variables
```
pnpm install
pnpm run vercel:link
pnpm run vercel:env-pull
```

#### Build

```
pnpm run build
```

#### Develop

```
pnpm run dev
```

## Managing Packages

#### Install dependencies

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

### Notion API Integration

#### About the page ID

You can obtain the page ID from your Notion page by the instruction in the [Notion API documentation](https://developers.notion.com/docs/working-with-page-content#creating-a-page-with-content)

#### Sharing a Notion page

You need to do two things:

- Create an integration in the Notion settings.
- Share the page you want to make public, and invite the integration that you created.

---

### Icon Sources

- <a href="https://www.flaticon.com/free-icons/back" title="back icons">Back icons created by Roundicons - Flaticon</a>
