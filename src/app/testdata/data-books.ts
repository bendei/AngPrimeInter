export const TESTBOOKS: any =   {  
    '34324233': {
                id: '34324233', 
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
    '554543654': {
        id: '554543654', 
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
    }
};