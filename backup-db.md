
# command for backing up db

```bash
docker-compose exec postgres pg_dumpall -c -U user-here > dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql
```

# command to restore from backup

```bash
cat your_dump.sql | docker-compose exec -i postgres psql -U user-here
```
