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
# show app logs
sudo docker logs devbox-app

# show db logs
sudo docker logs devbox-db
```

## MK JWT keys
```
ssh-keygen -t rsa -b 4096 -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
#
```
