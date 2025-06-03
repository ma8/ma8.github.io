module.exports = {
  plugins: [
    require('postcss-import'),  // Permet importar arxius CSS dins altres CSS
    require('autoprefixer'),    // Afegir els prefixos de navegador automàticament
    require('postcss-pxtorem')({ // Converteix px a rem
      rootValue: 16,             // 1rem = 16px (ajusta segons el teu font-size base)
      propList: ['*'],           // Aplica a totes les propietats
      selectorBlackList: [],     // Opcional: selectors a ignorar
      minPixelValue: 2           // No converteix valors menors que 2px
    }),
    require('cssnano')          // Minificar el CSS per producció
  ]
};