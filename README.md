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
```
document.cookie = "usuario=Joao; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

let cookie = document.cookie
console.log(document.cookie);

// update
document.cookie = "usuario=Maria; path=/";

// clear
document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

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
```
// Abrir/criar banco chamado "meuBanco" versão 1
let request = indexedDB.open("meuBanco", 1);

request.onupgradeneeded = function(event) {
    let db = event.target.result;
    // Criar um object store chamado "usuarios" com chave "id"
    db.createObjectStore("usuarios", { keyPath: "id" });
};

request.onsuccess = function(event) {
    let db = event.target.result;

    let transaction = db.transaction("usuarios", "readwrite");
    let store = transaction.objectStore("usuarios");

    store.add({ id: 1, nome: "João", idade: 30 });

    let getRequest = store.get(1);
    getRequest.onsuccess = function() {
        console.log(getRequest.result);  // {id: 1, nome: "João", idade: 30}
    };
};

request.onerror = function(event) {
    console.error("Erro ao abrir o banco:", event.target.error);
};

```
