# NotesApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Generate a docker image
1. Create a file named nginx.conf in your root folder:
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        # This is the magic line for Angular SPAs
        try_files $uri $uri/ /index.html;
    }

    # Optional: Cache static assets for performance
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}

https://docs.docker.com/guides/angular/containerize/

2. Create the Dockerfile
´´´
# ----------------------------
# Stage 1: Build the Angular App
# ----------------------------
FROM node:20-alpine as build

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app for production
RUN npm run build -- --configuration production

# ----------------------------
# Stage 2: Serve with Nginx
# ----------------------------
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from Stage 1
# CHECK THIS PATH: dist/your-project-name/browser (Angular 17+) 
# or dist/your-project-name (Older versions)
COPY --from=build /app/dist/your-project-name/browser /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
´´´


3. Create .dockerignore
node_modules
dist
.git
.idea
.vscode


4. Build and Tag the Image
docker build -t maurovelasco/notes-app:12.0 .
docker build --platform linux/amd64 -t maurovelasco/notes-app:12.0 .


5. Test Locally
docker run -p 8080:80 maurovelasco/notes-app:12.0

Open http://localhost:8080 in your browser.


6. Push to Docker Hub
docker login
docker push maurovelasco/notes-app:12.0


