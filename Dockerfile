FROM mcr.microsoft.com/playwright:v1.35.0-jammy

COPY . .

RUN npm install

CMD ["npm", "test"]
