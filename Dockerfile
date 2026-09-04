# --- Stage 1: Application Build ---
    FROM node:22-alpine AS builder
    
    WORKDIR /app
    
    # 1. Installation de pnpm en global
    RUN npm install -g pnpm
    
    # 2. Copie de tout le code
    COPY . .
    
    # 3. ☢️ LA CORRECTION DÉFINITIVE ☢️
    # On supprime le champ packageManager pour empêcher pnpm de s'auto-télécharger
    RUN npm pkg delete packageManager
    # On supprime le lockfile du Mac pour forcer une résolution 100% Linux propre
    RUN rm -f pnpm-lock.yaml
    
    # 4. Installation native parfaite pour Alpine Linux
    RUN pnpm install
    
    # 5. Build de l'application web
    RUN pnpm --filter @jqbtx/web run build
    
    
    # --- Stage 2: Nginx Server ---
    FROM nginx:alpine
    
    # Copie du build généré depuis l'étape 1
    COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
    
    # Copie de la configuration Nginx
    COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
    
    # Exposition du port interne
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]