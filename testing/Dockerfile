FROM cypress/included:14.3.3
EXPOSE 3002:3002
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "test"]
