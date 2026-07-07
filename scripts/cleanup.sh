#!/bin/bash

# ============== Colors ==============
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}======================================${NC}"
echo -e "${YELLOW}Docker Compose Cleanup Script${NC}"
echo -e "${YELLOW}======================================${NC}"
echo ""

# ============== Down all containers + volumes ==============
echo -e "${YELLOW}[1/3] Stopping and removing containers + volumes...${NC}"
docker compose down -v 2>/dev/null && \
    echo -e "${GREEN}✓ Containers and volumes removed${NC}" || \
    echo -e "${RED}✗ No docker-compose found or already down${NC}"
echo ""

# ============== Remove project images ==============
read -p "$(echo -e ${YELLOW}[2/3]${NC}) Remove project images (backend, frontend)? [y/N] " confirm_project
if [[ "$confirm_project" = [yY] ]]; then
    echo -e "${YELLOW}Removing project images...${NC}"
    docker rmi \
        "ghcr.io/qingyunne/todolist-backend:latest" \
        "ghcr.io/qingyunne/todolist-frontend:latest" \
        2>/dev/null && \
        echo -e "${GREEN}✓ Project images removed${NC}" || \
        echo -e "${YELLOW}⚠ Some images not found (OK if not built yet)${NC}"
fi
echo ""

# ============== Remove database images ==============
read -p "$(echo -e ${YELLOW}[3/3]${NC}) Remove database image (postgres:16-alpine)? [y/N] " confirm_db
if [[ "$confirm_db" = [yY] ]]; then
    echo -e "${YELLOW}Removing database images...${NC}"
    docker rmi postgres:16-alpine \
        2>/dev/null && \
        echo -e "${GREEN}✓ Database image removed${NC}" || \
        echo -e "${YELLOW}⚠ Database image not found (OK)${NC}"
fi
echo ""

# ============== Summary ==============
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Cleanup complete!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Build images:   docker-compose build"
echo "  2. Run stack:      docker-compose up -d"
echo "  3. Check logs:     docker-compose logs -f"
echo ""