# AngularNgrxTodo

This project was a little study case about Angular Ngrx, and how we can use it with some API. Here I used LocalStorage to mock a database, but instead, we could do some API call, just using the effects.

I split every file in a specific folder, to keep things more understandable.

- `task.actions` is where I declared the actions that my app will use.
- `task.reducer` is responsible for make changes, and it is triggered when an action happens.
- `task.selectors` is used to retrieve data from the state
- `task.state` is just interfaces that represent task state
- `task.effects` is what call my external API

In my opinion, is a little to much have so many files to make one or two things happen. But is a fact that we can keep our components free from unnecessary responsibilities, as call an API.

Talking about the components, they are very simple. For the modal I apllied Angular Cdk Overlay, what was very nice to do. And it ended quite simple, just check the `modal.service` to understand.

---

#### Applied Technologies

- Angular
- Ngrx
- Ngrx Effects
- Angular Cdk Overlay
