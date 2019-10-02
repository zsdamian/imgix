FROM php:7.2.10-fpm

RUN apt-get update \
    && apt-get install -y --no-install-recommends nano mysql-client curl debconf subversion git apt-transport-https apt-utils \
    build-essential locales acl mailutils wget nodejs zip unzip \
    gnupg gnupg1 gnupg2 \
    zlib1g-dev \
    sudo \
    python3 \
    python-pip

RUN pip install pika pillow --upgrade

RUN docker-php-ext-install  pdo pdo_mysql zip bcmath

RUN curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash - && \
    apt-get install -y npm && \
    npm install --global yarn && \
    yarn global add webpack pm2

COPY php.ini /usr/local/etc/php/php.ini
COPY xdebug.ini /usr/local/etc/php/mods-available/xdebug.ini

COPY php-fpm-pool.conf 	/usr/local/etc/php/pool.d/www.conf

RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls && \
	mv composer.phar /usr/local/bin/composer

RUN wget --no-check-certificate https://phar.phpunit.de/phpunit-6.5.3.phar && \
    mv phpunit*.phar phpunit.phar && \
    chmod +x phpunit.phar && \
    mv phpunit.phar /usr/local/bin/phpunit

RUN	curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash - && \
    sudo apt-get install -y nodejs

RUN groupadd dev -g 999
RUN useradd dev -g dev -d /home/dev -m
RUN passwd -d dev

RUN rm -rf /var/lib/apt/lists/*
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen

RUN echo "dev ALL=(ALL) ALL" > /etc/sudoers

#RUN pm2 start /home/wwwroot/app/imgix/imxig.py

WORKDIR /home/wwwroot/app/server
##</romaricp>##

EXPOSE 9000
CMD ["php-fpm"]
