# lft-ride-sharing
This is a monorepo based application that has `client` and `server` as frontend and backend respectively.  For client we have [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and for backend we have [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Server

### Installing Dependencies

In order to install all the dependencies for server run:
```bash
npm run install:server
# or
yarn install:server
```

### Running the app
After that in order to run the server run:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run server:test

# e2e tests
$ npm run server:test-e2e

# test coverage
$ npm run server:test-cov
```

## Client

### Installing Dependencies

In order to install all the dependencies for client run:
```bash
npm run install:client
# or
yarn install:client
```

### Running the app
In order to install all the dependencies for server run:
First, run the development server:

```bash
npm run dev:client
# or
yarn dev:client
# or
pnpm dev:client
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More (Next.js)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Learn More (Nest.js)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
