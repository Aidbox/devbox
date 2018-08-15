# Aidbox Developer Version (aka devbox)

This repository contains auxiliary files to help you quickly run
devbox on your local workstation and start crafting your first FHIR
application.

`samples` folder contains examples of various applications/components
you might find useful.

## Install Docker

To run aidbox locally, you need to install Docker first. Please follow
[Docker Documentation](https://docs.docker.com/install/) to install it
for your operating system.

When Docker is installed, make sure `docker ps` command is working and
shows that no containers are currently running:

    $ docker ps
    CONTAINER ID        IMAGE                               COMMAND            CREATED             STATUS              PORTS

Make sure that `docker-compose` command is available as well, because
we'll use it to start/stop devbox.

Last step is `docker login` command. You need to provide your
DockerHub's credentials to your local docker daemon so it will
identify you when it will pull devbox's images. We need this step
because devbox images are private, not public. Most likely you'll need
to invoke `docker login` command only once, and Docker will store you
credentials in your home folder.

    $ docker login
    Username: your-dockerhub-username
    Password: xxxxxxx

## Running devbox with docker-compose

Now you're ready to start devbox instance. In the root of this
repository, invoke `docker-compose up -d` command:

    $ docker-compose up -d
    Creating network "devbox_default" with the default driver
    Creating devbox_devbox-db_1 ... done
    Creating devbox_devbox_1    ... done

That's it! Devbox is running and you can point your browser to
http://localhost:8888/ to see fancy welcome page.

If `docker-compose` command failed with error, most likely it's
because port 8888 (which devbox is using by default) is already binded
by another process. In that case you can change it with `DEVBOX_PORT`
environment variable:

    $ DEVBOX_PORT=7777 docker-compose up -d

With such command, devbox will listen to port 7777.

## Stopping devbox

To stop devbox, just invoke `docker-compose down` command in the root
of this repository.

## Running multiple devbox instances

TODO

## Accessing logs

TODO: better explanation

```
# show app logs
sudo docker logs devbox-app

# show db logs
sudo docker logs devbox-db
```
