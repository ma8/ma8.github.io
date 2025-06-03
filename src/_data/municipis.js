//Cambrils, Reus, Salou, Vila-Seca, Tarragona, Valls, Montblanc, Girona
module.exports = [
  {
    nom: "Reus",
    serveis: [ "parquimetre", "parquings", "denuncies", "express", "recarrega_electrica", 'dum'],
    full: true,
    test: false,
    contacte:{
      tel: "977326249",
      mail:"zonablava@reusmobilitat.cat",
      web: "https://www.reus.cat",
      horari: "24/7",
      twitter:"https://x.com/reusmobilitat"
    }
  },
  {
    nom: "Cambrils",
    serveis: ["parquimetre", "parquings", "denuncies", "recarrega_electrica"],
    contacte:{
      tel: "977364087",
      mail:"aparcam@aparcam.cat",
      web: "https://www.cambrils.cat/",
      horari: "De dilluns a divendres de 8 a 1 h",
      twitter:"https://twitter.com/ajcambrils"
    }
  },
  {
    nom: "Vila-Seca",
    serveis: ["parquimetre", "denuncies",],
    contacte:{
      tel: "977309300",
      mail:"ajuntament@vila-seca.cat",
      web: "https://vila-seca.cat/",
      horari: "De dilluns a divendres de 9 a 14 h",
      twitter:"https://twitter.com/AjVilaseca"
    }
  },
  {
    nom: "Salou",
    serveis: ["parquimetre", "denuncies", "recarrega_electrica"],
    contacte:{
      tel: "679996425",
      mail:"zonablava@salou.cat",
      web: "https://www.salou.cat",
      horari: "De dilluns a divendres de 9.30 a 14 h i de 17 a 20 h.Dissabtes de 9.30 a 14 h",
      whatsapp:"https://wa.me/34664292456"
    }
  },
  {
    nom: "Tarragona",
    serveis: ["parquimetre", "parquings", "denuncies", "recarrega_electrica"],
    contacte:{
      tel: "977239151",
      mail:"aparcamentstgn@aprcamentstgn.cat",
      web: "https://www.tarragona.cat",
      horari: "De dilluns a divendres de 9 a 14 h",
      twitter:"https://twitter.com/TGNAjuntament"
    }
  },
  {
    nom: "Valls",
    serveis: ["parquimetre", "denuncies"],
    contacte:{
      tel: "977609083",
      mail:"vias@valls.cat",
      web: "https://www.valls.cat",
      horari: "De dilluns a divendresde 9 h a 14 h",
      twitter:""
    }
  },
  {
    nom: "Montblanc",
    serveis: ["parquimetre", "denuncies"],
    contacte:{
      tel: "977862696",
      mail:"oscar17@montblanc.cat",
      web: "https://www.montblanc.cat",
      horari: "De dilluns a dissabte de 9 a 20 h",
      twitter:"https://twitter.com/ajmontblanc"
    }
  },
  {
    nom: "Girona",
    serveis: ["parquimetre", "denuncies"],
    contacte:{
      tel: "972426748",
      mail:"zonablavaiverda@ajgirona.cat",
      web: "https://www.girona.cat",
      horari: "De dilluns a divendres laborables de 9.30 a 13h i de 16 a 20h",
      twitter:"https://twitter.com/girona_cat"
    }
  },
  // ...
].sort((a, b) => a.nom.localeCompare(b.nom));