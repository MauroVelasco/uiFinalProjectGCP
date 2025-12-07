# Use the official Node.js image for building Angular
FROM node:lts-slim AS build
WORKDIR /app
RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm ci


COPY . ./
RUN ng build --configuration=production



# Build the Angular app
#RUN npm run build --prod

# Use Nginx to serve the built Angular app
FROM nginx:stable AS final
EXPOSE 8080
COPY --from=0 /app/dist/*/browser /usr/share/nginx/html

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
