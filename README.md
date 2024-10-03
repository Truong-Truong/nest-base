# nest-base
## Run

```shell
docker-compose up -d
```


## Sample localstack

```
aws --endpoint-url=http://localhost:4566 s3 mb s3://new-bucket
aws --endpoint-url=http://localhost:4566 s3 ls
```