# ==========================================================================
# Stage 1 — Builder: install deps and produce dist/
# ==========================================================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==========================================================================
# Stage 2 — Runtime: serve dist/ via nginx as a non-root user
# ==========================================================================
FROM nginxinc/nginx-unprivileged:1.27-alpine

USER root
RUN apk add --no-cache wget
USER nginx

COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
