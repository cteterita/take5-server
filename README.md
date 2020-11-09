# Take 5, A Journaling App for Intention & Gratitude
[Live Link](https://take5-react.vercel.app/)

## Summary
Take 5 is a journaling app that guides users to set their intentions every morning, and practice gratitude in the evenings.

The concept and questions are an exercise developed by Abigail Bruce at [Integrative Care NP, LLC](https://www.integrativemindbody.com/).

![Screenshot of app](/screenshots/Demo.png)

## Technologies & Services Used:
- [Node.js](https://nodejs.org/en/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Express](https://expressjs.com/)

## Frontend Repo
- [take5-react](https://github.com/cteterita/take5-react)

## API Documentation
### `/entries/:date`

```js
// req.params
{
  "date": String // format: `YYYY-mm-DD`
}
```

#### GET

```js
// req.body
{}

// res.body
{
  "complete": Bool,
  "prompts": [
    {
      "prompt": String,
      "promptId": String,
      "responses: [
        String,
        String,
        String,
        ...
      ]
    },
    ...
  ]
}
```

#### POST

```js
// req.body
{
  "type": Bool, // either "morning" or "evening"
  "prompts": [
    {
      "prompt": String,
      "promptId": String,
      "responses: [
        String,
        String,
        String,
        ...
      ]
    },
    ...
  ]
}

// res.body
{} // empty response
```

#### DELETE

```js
// req.body
{}

// res.body
// upon successful delete, it returns the default questions for the user to complete anew
{
  "complete": Bool,
  "prompts": [
    {
      "prompt": String,
      "promptId": String,
      "responses: [
        String,
        String,
        String,
        ...
      ]
    },
    ...
  ]
}
```
