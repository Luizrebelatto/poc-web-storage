# POC Web Storage

## How to run Locally
1. Clone repository
```
https://github.com/Luizrebelatto/poc-web-storage.git
```
2. Run `yarn install` and `npm install`
3. Run `yarn dev` and `npm run dev`
4. access this url `http://localhost:5173`
5. Login
```
email: test@test.com
password: 123456
```

### Cookies
- Browser can create, edit, update cookies
- cookies last until the browser is closed
- limited size (~4 KB por cookie)
- string (key=value)
- Use Cases
  - user preferences
  - login
- create
```
Set-Cookie: <cookie-name>=<cookie-value>

example:

create a cookie with an expiration date

Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;

```
- update cookie
```
document.cookie = "yummy_cookie=chocolate";
```
- Enable security
```
Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
```

### sessionStorage
- Limit size ~5–10 MB
- Only on the current tab
- When the tab is closed the data is deleted
- Format type string
- Use Cases
 - temporary data
 - filter
 - multi-form
```
sessionStorage.setItem("nome", "João");

let nome = sessionStorage.getItem("nome");
console.log(nome);

sessionStorage.removeItem("nome");

sessionStorage.clear();
```

### localStorage
- Limit size ~5–10 MB
- persists until it is deleted
- share between tabs
- Use Cases
 - temporary data
 - filter
 - multi-form
```
// create
const usuario = { id: 1, nome: "luiz", idade: 24 };
localStorage.setItem("user", JSON.stringify(user));

// edit
let user = JSON.parse(localStorage.getItem("user"));
user.age = 25;
localStorage.setItem("user", JSON.stringify(user));

// Remove
localStorage.removeItem("user");

// Clean
localStorage.clear();

```

### IndexedDB
- application can work offline and online
- 100MB+
- format JSON
- 
```
// open database
const request = window.indexedDB.open("MyTestDatabase", 3);

const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
]

request.onupgradeneeded = (event) => {
  // Save the IDBDatabase interface
  const db = event.target.result;

  // Create an object
  const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
};

request.onerror = (event) => {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
};

request.onsuccess = (event) => {
  db = event.target.result;
};

```
