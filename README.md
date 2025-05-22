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

## Concepts
| Característica            | Cookies                     | sessionStorage              | localStorage                | IndexedDB                    |
|---------------------------|------------------------------|------------------------------|------------------------------|-------------------------------|
| **Persistência**          | Configurável (expira ou sessão) | Apenas durante a aba        | Persistente até ser apagado | Persistente até ser apagado  |
| **Tamanho máximo**        | ~4 KB                        | ~5–10 MB                    | ~5–10 MB                    | 100MB+ (varia por navegador) |
| **Compartilhamento**      | Entre abas e com o servidor  | Apenas na aba atual         | Compartilhado entre abas    | Compartilhado entre abas     |
| **Disponível no servidor**| ✅ Sim (via HTTP)            | ❌ Não                       | ❌ Não                       | ❌ Não                        |
| **Acesso por JavaScript** | ✅ Sim                       | ✅ Sim                       | ✅ Sim                       | ✅ Sim (via API assíncrona)   |
| **Reatividade**           | ❌ Não                       | ❌ Não                       | ❌ Não                       | ❌ Não                        |
| **Formato de dados**      | String (chave=valor)         | String                      | String                      | Objetos estruturados (JSON)  |
| **Facilidade de uso**     | Média (manual e limitada)    | Fácil                       | Fácil                       | Mais complexa (event-driven) |
| **Uso típico**            | Sessões, login, preferências | Dados temporários por aba   | Preferências persistentes   | Cache, dados offline, blobs  |


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
```
// storage data
sessionStorage.setItem("nome", "João");

// Read data
let nome = sessionStorage.getItem("nome");
console.log(nome);

// Remove item
sessionStorage.removeItem("nome");

// Clear all
sessionStorage.clear();
```

### localStorage
```
// Armazenar dados
localStorage.setItem("tema", "escuro");

// Ler dados
let tema = localStorage.getItem("tema");
console.log(tema);  // escuro

// Remover item
localStorage.removeItem("tema");

// Limpar tudo
localStorage.clear();

```

### IndexedDB
- application can work offline and online
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
