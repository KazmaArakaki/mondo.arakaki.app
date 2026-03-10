FROM mcr.microsoft.com/devcontainers/base:trixie

RUN apt-get update && apt-get upgrade -y

RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash \
  && apt-get install -y nodejs

RUN npm install -g pnpm@latest-10

USER vscode
