# graphiql-app

## Overview

Welcome to the GraphQL and REST Client project! This project provides a comprehensive client for interacting with GraphQL and REST APIs. It was developed as the final project for the React course at [RS School](https://rs.school/).

## Technology stack

- **Frontend**: Next.js, Redux Toolkit, SCSS, TypeScript, Firebase, i18next, MUI
- **GraphQL and REST**: Axios or Fetch API, Codemirror
- **Code Quality**: ESLint, Prettier, Husky, Vitest

## Available Scripts

- `npm run dev`: runs the app in development mode.
- `npm run build`: builds the app for production in the `build` folder.
- `npm test`: runs Vitest tests with coverage reporting and additional reporters.
- `npm run lint`: runs ESLint to check for errors in TypeScript and TypeScript React files.
- `npm run prettier-fix`: formats the code using Prettier according to the rules in `.prettierrc`.

## Setting up and running locally

clone the project

```bash
  git clone https://github.com/annaAzh/graphiql-app.git
```

go to the project folder

```bash
  cd graphiql-app
```

install dependencies

```bash
  npm install
```

start the Development Server

```bash
  npm run dev
```

Run Tests

```bash
  npm test
```

## Usage

### GraphQL Example

<details>
  <summary> Query (Example Data)</summary>

- example `url`:

  ```
  https://rickandmortyapi.com/graphql
  ```

- example `query`:

  ```
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
  ```

</details>

<details>
  <summary> Query + Variables (Example Data)</summary>

- example `url`:

  ```
  https://rickandmortyapi.com/graphql
  ```

- example `variables`:

  ```
  "name": "Rick",
  "status": "alive"
  ```

- example `query`:

  ```
    query GetCharacters($status: String!, $name: String!) {
      characters(filter: {
        status: $status,
        name: $name
      }) {
        results {
          id
          name
          image
        }

      }
    }
  ```

</details>

---

### REST Example

<details>
  <summary>Body without variables</summary>

- example `url`:

  ```
  https://jsonplaceholder.typicode.com/posts
  ```

- example `method`:

  ```
  POST
  ```

- example `body`:

  ```
  {
    "title": "{{foo}}",
    "body": "test"
  }
  ```

  - example `expected result without variables`:

  ```
  {
    "title": "{{foo}}",
    "body": "test",
    "id": 101
  }
  ```

</details>

<details>
  <summary>Body with variables</summary>

- example `url`:

  ```
  https://jsonplaceholder.typicode.com/posts
  ```

- example `method`:

  ```
  POST
  ```

  - example `variables`:

  ```
  foo: bar
  ```

- example `body`:

  ```
  {
    "title": "{{foo}}",
    "body": "test"
  }
  ```

- example `expected result with variables`:

  ```
  {
    "title": "bar",
    "body": "test",
    "id": 101
  }
  ```

</details>
