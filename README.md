## Personal blogging system

This is a personal blog site with some blogs and projects written by myself. At present, there are functions such as viewing and publishing blogs, viewing and publishing projects, modifying personal information, and switching themes. At present, only some basic functions have been implemented, and more functions are coming soon.

### Run the project

1. Clone the project locally

```
git clone git@github.com:maojiu-bb/blog.git
```

2. Install the dependent package

```
npm install
```

3. run

```
npm run dev
```

### The technology stack used

#### Front

> Vue3 + TypeScript + Vite + Vue-Router + Pinia + Element-plus

```
structure:
      |--api   // Related to network requests
      |
      |--assets   // Hold static resources
      |
      |--components  // Common components
      |
      |--hooks   // Custom hook function
src-- |
      |--router   // Related to Router
      |
      |--store    // Data store
      |
      |--style    // The style of the item
      |
      |--theme    // Customized theme styles
      |
      |--types    // TS type constraints
      |
      |--views    // Pages of the project
```

#### Back

> Node.js + express + mongoose

the express serve address:

```
https://github.com/maojiu-bb/blog-server
```

#### Database

> MongoDB

### Features

Features that may be developed in the future:

- Comment function
- Star function
- Friend chain module
- Resource sharing module

### LICENSE

ISC
