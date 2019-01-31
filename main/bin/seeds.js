// const Beer = require('../models/Beer');
// const mongoose = require('mongoose');
// mongoose
//   .connect('mongodb://localhost/yocervezo', {useNewUrlParser: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });
// const seedBeers = [{
//   sku : "S001",
//   stock : 45,
//   price : 24,
//   style : "Pilsner",
//   brand : "Tecatito Beers",
//   image_src : "https://www.abc.es/media/sociedad/2016/10/20/gato-huerfano2-kM2--620x349@abc.jpg"
// },{
//   sku : "S002",
//   stock : 66,
//   price : 12,
//   style : "IPA",
//   brand : "Jaguar",
//   image_src : "https://cdn2.royalcanin.es/wp-content/uploads/2016/03/3.jpg"
// },{
//   sku : "S003",
//   stock : 22,
//   price : 15,
//   style : "Pale Ale",
//   brand : "Mano Pachona",
//   image_src : "https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/11/28/Recortada/img_econcejo_20180212-115318_imagenes_lv_terceros_istock-149052633-kLZH-U453218462664VrE-992x558@LaVanguardia-Web.jpg"
// },{
//   sku : "S004",
//   stock : 7,
//   price : 60,
//   style : "Imperial Stout",
//   brand : "Siamese Dream",
//   image_src : "https://http2.mlstatic.com/gatitos-siames-excelente-calidad-D_NQ_NP_908121-MLM20725486733_052016-F.jpg"
// }
// ];
// Beer.create(seedBeers)
//   .then(beers => console.log(beers.map(beer => beer.brand)))
//   .catch(err => console.log("An error occurred: ", err));
