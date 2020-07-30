# Engineering Journal

Consolidate and organize browser bookmarks and links stashed throughout reading lists, note apps, docs, and spreadsheets.

***

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/addResource.js" target="_blank">addResource.js 🔗</a>

`addResource`
- Function
- POST request to add a new resource to the current topic
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) if errors, otherwise [prependToTable](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/addResource.js) (see below)
- Params: click event
- Returns: undefined (side effects only)

`prependToTable`
- Function
- Prepends new resource to table body but after pinned items, if any
- Invoked by: POST request from [addResource](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/addResource.js)
- Params: resource object
- Returns: undefined (side effects only)

`filterInputValue`
- String
- User input from filter input element
- If a user input exists while adding a new resource, [filterTableRows](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) is invoked

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/deleteResource.js" target="_blank">deleteResource.js 🔗</a>

`deleteResource`
- Function
- DELETE request to delete a resource
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) if errors, otherwise [removeRow](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/deleteResource.js) (see below)
- Params: click event
- Returns: undefined (side effects only)

`removeRow`
- Function
- Removes a table row after deleting a resource
- Params: id: string
- Returns: undefined (side effects only)

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/editResource.js" target="_blank">editResource.js 🔗</a>

`editResource`
- Function
- PUT request to edit resource
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) if errors, otherwise [updateRow](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/editResource.js) (see below)
- Invoked by: [form submission](https://github.com/WarrenMfg/engineering-journal/blob/master/client/topic.html)
- Params: submit event
- Returns: undefined (side effects only)

`updateRow`
- Function
- Updates a table row after editing a resource
- Params: id: string, resource: object
- If a user input exists in the filter input while adding a new resource, [filterTableRows](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) is invoked
- Returns: undefined (side effects only)

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/onload.js" target="_blank">onload.js 🔗</a>

`IFFE`
- Immediately Invoked Function Expression
- Fetches user data on load; adds search and edit modal event listeners; adds table, error feedback, and filter event listeners

`$.ajax`
- GET request invoked when loading a topic page
- Populates table with the topic's corresonding resources (see below)

`appendToTable`
- Function
- Appends resources to table body
- Params: resources: array of objects
- Returns: undefined (side effects only)

`prependToTable`
- Function
- Prepends pinned resources to table body
- Params: tbody: HTML element, pinOrder: array of pins, pins: array of objects (pinned resources), unpinnedHTML: HTML string (unpinned resources)
- Returns: undefined (side effects only)

`searchModal`
- Function
- Invoked on load (see search.js below)

`editModal`
- Event listeners
- Close modal event listeners: keydown, mousedown, click
- Delete resource event listener: click

`table`
- Event listeners
- Show edit modal delegated event listener: click
- Pin and unpin resources event listener: click
  - PUT request to pin
  - PUT request to unpin

`#error-feedback`
- Event listener
- Toggles [error feedback div](https://github.com/WarrenMfg/engineering-journal/blob/master/client/topic.html) display to none

`debounce`
- Function
- To delay filter [filterTableRows](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) until typing stops
- Params: func: filterTableRows function, delay: integer in milliseconds
- Returns: anonymous function to be invoked by input event when filtering

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/search.js" target="_blank">search.js 🔗</a>

`searchModal`
- Function
- Decorates [search modal](https://github.com/WarrenMfg/engineering-journal/blob/master/client/topic.html) with event listeners
  - Open search modal: click
  - Close search modal: keydown, mousedown, click
  - Cancel search modal: click
  - Search user input: click (opens search result in new tab)
- Params: none
- Returns: undefined (side effects only)

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/topicCollection.js" target="_blank">topicCollection.js 🔗</a>

`IFFE`
- Immediately Invoked Function Expression
- Uses URL to get topic name and updates `title`, `meta`, and `h1` elements

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/topics.js" target="_blank">topics.js 🔗</a>

`IIFE`
- Immediately Invoked Function Expression
- Decorates mulitple DOM elements with event listeners

`Add a Topic`
- Dropdown menu: click to use innerText to update URL of topic.html (e.g. `topic.html?collection=Git`)
- Toggle input to add a new topic: click
- Topic input: blur and keydown (to submit new topic name)
  - POST request to add new topic
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) if errors, otherwise [populateDropdownMenu](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js), and/or [populateEditTopic](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) depending if viewing `index.html`

`Delete a Topic`
- Click on delete button at bottom of page (of a custom page)
- DELETE request to delete custom topic
- Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) if errors
- Redirects to `index.html`

`Update Topic Name`
- H1 is editable with `contenteditable` attribute
- Keydown event listener for Enter key, blurs the element
- On blur event listener
  - PUT request to update topic name
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) if errors, otherwise replaces current `window.location` with updated path

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/updatePassword.js" target="_blank">updatePassword.js 🔗</a>

`#update-password`
- Keydown event listener for Enter key
- Updates password
- Used for internal development purposes only

# <a href="https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js" target="_blank">utils.js 🔗</a>

`DOMPurify`
- Object
- Configures allowed tags from user input

`API_URL`
- String
- Sets the origin for the [API](https://github.com/WarrenMfg/engineering-journal-api)

`timeoutID`
- Integer
- Timeout ID for [error feedback dropdown](https://github.com/WarrenMfg/engineering-journal/blob/master/client/topic.html)

`handleErrors`
- Function
- Provides error feedback to users
- Params: feedback: string
- Returns: undefined (side effects only)

`populateDropdownMenu`
- Function
- Add topics (namespaces) to navigation dropdown menu
- Params: namespaces: string[], collection: string
- Returns: sortedNamespaces: string[]

`populateEditTopic`
- Function
- Add topcs (namespaces) to edit modal's select element
- Params: sortedNamespaces: string[]
- Returns: undefined (side effects only)

`validateResourceInputs`
- Function
- Validates user inputs for a new resource
- Params: description: string, keywords: string, link: string
- Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) if invalid inputs
- Returns: object of valid user inputs, with property `createdAt: Date.now()`

`validateSearchInputs`
- Function
- Validates user input for search modal
- Params: search: string, site: string
- Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/master/client/assets/js/utils.js) if invalid inputs
- Returns: object with valid user inputs

`getHost`
- Function
- Splits resource link to find domain/host before inserting into DOM
- Params: link: string
- Returns: domain/host

`getURLcollection`
- Function
- Returns: decoded search param (the topic)

`tableRow`
- Function
- Creates a table row for the resources table
- Params: className: string, createdAt: integer, description: string, keywords: string[], link: string, _id: ObjectId
- Returns: HTML string

`unfreezeBody`
- Function
- Unfreezes body element when closing a modal
- Params: none
- Returns: undefined (side effects only)

`filterTableRows`
- Function
- Filter function invoked when typing stops in filter input; or when filtered, and adding a new resource; or when filtered, and making an edit to a resource
- Params: input event
- Returns: undefined (side effects only)

***

## Roadmap

- Consolidate this Engineering Journal repo and the [Engineering Journal API](https://github.com/WarrenMfg/engineering-journal-api) repo into single repo
- Add OAuth
- Update API documenation
- Convert to React single-page application

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [Dr. Ian Carnaghan](https://www.carnaghan.com/)
