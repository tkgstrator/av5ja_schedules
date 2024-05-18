## Hono + Prisma + Cloudflare D1

### Migrations

```zsh
bunx wrangler d1 migrations create <database> <message>
```

### Migrate

```zsh
bunx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script --output migrations/0001_create_users_table.sql
```

### Apply

#### Local

```zsh
bunx wrangler d1 migrations apply hono-db --local
```

#### Remote

```zsh
bunx wrangler d1 migrations apply hono-db --remote
```
