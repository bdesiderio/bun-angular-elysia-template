# Build stage
FROM oven/bun:1 as builder

WORKDIR /app

# Copy root package files first
COPY package.json ./
COPY bun.lock ./

# Copy all package.json files
COPY packages/backend/presentation/package.json ./packages/backend/presentation/
COPY packages/backend/application/package.json ./packages/backend/application/
COPY packages/backend/core/package.json ./packages/backend/core/
COPY packages/backend/infrastructure/data/filesystem/package.json ./packages/backend/infrastructure/data/filesystem/
COPY packages/backend/infrastructure/data/mongodb/package.json ./packages/backend/infrastructure/data/mongodb/
COPY packages/calipso-libs/calipso-ts/package.json ./packages/calipso-libs/calipso-ts/
COPY packages/calipso-libs/calipso-data-mongodb/package.json ./packages/calipso-libs/calipso-data-mongodb/
COPY packages/calipso-libs/typescript-npm/core/package.json ./packages/calipso-libs/typescript-npm/core/
COPY packages/shared-dtos/package.json ./packages/shared-dtos/

# Install dependencies
RUN bun install

# Copy source code
COPY packages/backend/presentation ./packages/backend/presentation
COPY packages/backend/application ./packages/backend/application
COPY packages/backend/core ./packages/backend/core
COPY packages/backend/infrastructure/data/filesystem ./packages/backend/infrastructure/data/filesystem
COPY packages/backend/infrastructure/data/mongodb ./packages/backend/infrastructure/data/mongodb
COPY packages/calipso-libs/calipso-ts ./packages/calipso-libs/calipso-ts
COPY packages/calipso-libs/calipso-data-mongodb ./packages/calipso-libs/calipso-data-mongodb
COPY packages/calipso-libs/typescript-npm/core ./packages/calipso-libs/typescript-npm/core
COPY packages/shared-dtos ./packages/shared-dtos

# Production stage
FROM oven/bun:1-slim

WORKDIR /app

COPY --from=builder /app/packages/backend/presentation ./packages/backend/presentation
COPY --from=builder /app/packages/backend/application ./packages/backend/application
COPY --from=builder /app/packages/backend/core ./packages/backend/core
COPY --from=builder /app/packages/backend/infrastructure/data/mongodb ./packages/backend/infrastructure/data/mongodb
COPY --from=builder /app/packages/backend/infrastructure/data/filesystem ./packages/backend/infrastructure/data/filesystem
COPY --from=builder /app/packages/calipso-libs/calipso-ts ./packages/calipso-libs/calipso-ts
COPY --from=builder /app/packages/calipso-libs/calipso-data-mongodb ./packages/calipso-libs/calipso-data-mongodb
COPY --from=builder /app/packages/calipso-libs/typescript-npm/core ./packages/calipso-libs/typescript-npm/core
COPY --from=builder /app/packages/shared-dtos ./packages/shared-dtos
COPY --from=builder /app/node_modules ./node_modules

COPY package.json ./
COPY bun.lock ./

# Create directory for visit files
RUN mkdir -p /app/data/visits

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3030

# Command to run the application
CMD ["bun", "run", "packages/backend/presentation/src/index.ts"] 