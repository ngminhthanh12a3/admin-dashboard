dev-up:
	COMPOSE_HTTP_TIMEOUT=1200 docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
dev-down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
prune:
	docker volume prune
	docker image prune
dev-up-build:
	COMPOSE_HTTP_TIMEOUT=1200 docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# ---------------
dev-prop-up:
	COMPOSE_HTTP_TIMEOUT=1200 docker-compose -f docker-compose.yml -f docker-compose.dev.prop.yml up -d
dev-prop-down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.prop.yml down
dev-prop-up-build:
	COMPOSE_HTTP_TIMEOUT=1200 docker-compose -f docker-compose.yml -f docker-compose.dev.prop.yml up -d --build
own:
	sudo chmod -R 777 .
	sudo chmod 666 /var/run/docker.sock
pull:
	git pull https://github.com/ngminhthanh12a3/admin-dashboard.git