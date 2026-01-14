# Build Stage
FROM node:20-alpine AS build

# Install git
RUN apk add --no-cache git

WORKDIR /app

# Define Build Argument for Repository URL
ARG REPO_URL=https://github.com/charbelkisso/devmatch.git

# Clone the repository
RUN git clone ${REPO_URL} .

RUN npm install
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
