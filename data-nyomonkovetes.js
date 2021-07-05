module.exports = function () {
    return { 
        menetvonalak: [
            {
                menetvonalId: 001,
                vonatszam: 82051,
                kozlNapja: new Date().toISOString(),
                indAlloms: "Dunaföldvár",
                erkAllomas: "Előszállási i. ipvk",
                vonatNev: "exPET / exPEDE",
            },
            {
                menetvonalId: 002,
                vonatszam: 82051,
                kozlNapja: new Date().toISOString(),
                indAlloms: "Dunaföldvár",
                erkAllomas: "Előszállási i. ipvk",
                vonatNev: "exPET / exPEDE",
            },
            {
                menetvonalId: 003,
                vonatszam: 82051,
                kozlNapja: new Date().toISOString(),
                indAlloms: "Dunaföldvár",
                erkAllomas: "Előszállási i. ipvk",
                vonatNev: "exPET / exPEDE",
            },{
                menetvonalId: 004,
                vonatszam: 82052,
                kozlNapja: new Date().toISOString(),
                indAlloms: "Kecskemét",
                erkAllomas: "Előszállási i. ipvk",
                vonatNev: "exPET / exPEDE",
            },{
                menetvonalId: 005,
                vonatszam: 82052,
                kozlNapja: new Date().toISOString(),
                indAlloms: "Szolnok",
                erkAllomas: "Előszállási i. ipvk",
                vonatNev: "exPET / exPEDE",
            }
        ],
        megrendelesek: [
            {
                id: 001,
                azonosito: "2021/198/0",
                mettol: new Date().toISOString(),
                meddig: new Date().toISOString(),
                megjegyzes: ""
            }
        ],
        menetrendek: [
            {
                id: 001,
                allomas: "Dunaföldvár",
                esemeny: "indulas",
                tavolsag: 5.00,
                indIdo: new Date().toISOString(),
                erkIdo: new Date().toISOString(),
            }
        ]
    }
}