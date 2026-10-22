FROM oven/bun:1.1.7
COPY --from=node:22.23.4 /usr/local/bin/node /usr/local/bin/node
COPY --from=node:22.23.4 /opt/yarn* /opt/yarn/

RUN ln -fs /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN ln -fs /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npx
RUN ln -fs /usr/local/lib/node /usr/local/bin/nodejs
RUN ln -fs /opt/yarn/bin/yarn /usr/local/bin/yarn
RUN ln -fs /opt/yarn/bin/yarn /usr/local/bin/yarnpkg

RUN apt_fragments="$(find /etc/apt/sources.list.d -mindepth 1 -print)" \
 && test -z "$apt_fragments" \
 && apt_sources="$(grep -Ev '^[[:space:]]*(#|$)' /etc/apt/sources.list)" \
 && test "$apt_sources" = "$(printf '%s\n' \
    'deb http://deb.debian.org/debian bullseye main' \
    'deb http://deb.debian.org/debian-security bullseye-security main' \
    'deb http://deb.debian.org/debian bullseye-updates main')" \
 && sed -i 's|^deb http://deb.debian.org/debian-security bullseye-security main$|deb http://archive.debian.org/debian-security bullseye-security main|' /etc/apt/sources.list \
 && grep -Fxq 'deb http://archive.debian.org/debian-security bullseye-security main' /etc/apt/sources.list \
 && rm -rf /var/lib/apt/lists/*

USER bun
WORKDIR /home/bun/app
CMD ["/bin/bash"]