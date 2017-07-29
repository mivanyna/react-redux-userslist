# User List React/Redux SPA with Node.js backend

> Simple page with CRUD operation. Was made as training project to have some practical experience with React, Redux and some basic Node.js skills.


# Framework

* [react](https://facebook.github.io/react/)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router](https://github.com/ReactTraining/react-router)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run production server
npm run prod

# lint code
npm run lint
```



## Data Types

### Report

```
{
  id: number,
  date: Date,
  summary: string,
  name: string,
  skills: []{ skill: string, cats: []string, mark: number },
}
```

### Report Template

```
{
  name: string,
  skills: []{ skill: string, cats: []string },
}
```

### User

```
{
  id: number,
  fullName: string,
  description: string,
}
```
