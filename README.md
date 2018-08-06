# Configure

```
vim docker-config.env
```
## Restart

```
./restart.sh
```


## Show logs

```
# show app loss
sudo docker logs devbox-app

# show db loss
sudo docker logs devbox-db
```

## Auth to Aidbox container registry

```
cat ./registry-auth.json | sudo docker login --username _json_key --password-stdin  us.gcr.io/aidbox2-205511
```

## MK JWT keys
```
ssh-keygen -t rsa -b 4096 -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
#
```
