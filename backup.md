## pg_dump example

```bash
pg_dump postgres://postgres.[REFERENCE_ID]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres --format=c > dump.dump
```

## pg_restore example

```bash
pg_restore --dbname=postgres://postgres.[REFERENCE_ID]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres --format=c --clean < dump.dump
```
