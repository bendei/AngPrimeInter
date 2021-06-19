

const jwt = require("jsonwebtoken");

const APP_SECRET = "myappsecret";
const USERNAME = "a";
const PASSWORD = "a";

const countries = ["Afghanistan","Andorra","Alabama","Belgium","Bhutan","Belaruss"];
const books = [
    {   id: '34324233', 
        isbn: '34324233', 
        sellers: [
            {name: 'Bende seller', address: 'sáky u 7a', quantity: 33000, age: 49, birthYear: 1972},
            {name: 'Sasform Agrotechnika Kft.', address: 'Felsőszéktó 86', quantity: 12000, age: 40, birthYear: 1981}
            ],
        title: "Angular 11", 
        authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'], 
        published:  new Date().toISOString(), subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices', rating: 5,
        thumbnails: [{
            url: 'https://ng-buch.de/angular-cover.jpg', title: 'Buchcover' }],
        description: 'Lernen Sie Angular mit diesem Praxisbuch!',
        genres: ['IT', 'Programming'],
        ebook: false,
        printed: false,
        availability: 'Available'
    },
    {   id: '554543654', 
        isbn: '554543654', 
        title: "React", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '1111', 
        isbn: '1111', 
        title: "React 1", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '2222', 
        isbn: '2222', 
        title: "React 2", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '3333', 
        isbn: '3333', 
        title: "React 3", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '4444', 
        isbn: '4444', 
        title: "React 4", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '5555', 
        isbn: '5555', 
        title: "React 5", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '6666', 
        isbn: '6666', 
        title: "React 6", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '7777', 
        isbn: '7777', 
        title: "React 7", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '8888', 
        isbn: '8888', 
        title: "React 8", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    },
    {   id: '9999', 
        isbn: '9999', 
        title: "React 9", 
        authors: ['Oliver Zeigermann', 'Nils Hartmann'], 
        subtitle: 'Grundlagen, fortgeschrittene Themen, Praxistipps', rating: 4,
        thumbnails: [{
            url: 'https://ng-buch.de/react-cover.jpg', title: 'Buchcover' }],
        description: 'Das bewährte und umfassende Praxisbuch zu React',
        genres: ['IT', 'Programming', 'Docker'],
        ebook: true,
        printed: false,
        availability: 'Available'
    }
];

const mappings = {
    get: ["/api/orders", "/orders","/api/products","/products", "/books", "/api/books", "/api/countries", "/countries"],
    post: ["/api/products", "/products", "/api/categories", "/categories", "/api/logs", "/logs"],
    delete: ["/api/products","/api/products"],
    put: ["/api/products","/products", "/api/orders", "/orders"],
}

function requiresAuth(method, url) {
    return (mappings[method.toLowerCase()] || [])
        .find(p => url.startsWith(p)) !== undefined;
}
module.exports = function (req, res, next) {
    
    console.log("request url:", req.url);

    if (req.url.endsWith("/logs") && req.method == "POST") {
        res.end();
        return;
    }
    else if(req.url.includes("/countries")) {
        let ind = req.url.lastIndexOf("/");
        let text = req.url.substring(++ind);
        let co = countries.filter(x => x.toLowerCase().startsWith(text.toLowerCase()));
        res.json(co);
        res.end();
        return;
    }
    // else if(req.url.includes("/books")) {
    //     let strippedUrl = req.url.substring(6);
    //     console.log("m:",strippedUrl);

    //     if(strippedUrl.startsWith('/')) {   
    //         let bookId = strippedUrl.substring(1);
    //         let book = books.filter(book => book.id == bookId);
    //         console.log(book);
    //         res.json(book[0]);  // integration test kellene erre ha arrayt adok vissza es nem objektzumot
    //         res.end();
    //         return;
    //     }
    //     else if(strippedUrl.startsWith('?')) {
    //         let booksPart = books.slice(0,4);
    //         res.json(booksPart[0]);
    //         res.end();
    //         return;
    //     }
    //     else {
    //         res.json(books);
    //         res.end();
    //         return;
    //     }

    // }
    else if (req.url.endsWith("/login") && req.method == "POST") {
        if (req.body && req.body.name == USERNAME && req.body.password == PASSWORD) {
            let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false });
        }
        res.end();
        return;
    } else if (requiresAuth(req.method, req.url)) {
        let token = req.headers["authorization"] || "";
        if (token.startsWith("Bearer<")) {
            token = token.substring(7, token.length - 1);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) { }
        }
        res.statusCode = 401;
        res.end();
        return;
    }
    next();
}