FROM nodesource/jessie:0.12.7

# cache package.json and node_modules to speed up builds
ADD package.json package.json
RUN npm install

EXPOSE 8001

# Add your source files
ADD . .
CMD ["node","index.js"]