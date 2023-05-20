module.exports = function (cardHtml, product) {
   let final = cardHtml.replace(/{~image}/g, product.image);
   final = final.replace(/{~productName}/g, product.productName);
   final = final.replace(/{~price}/g, product.price);
   final = final.replace(/{~id}/g, product.id);
   final = final.replace(/{~from}/g, product.form);
   final = final.replace(/{~nutrients}/g, product.nutrients);
   final = final.replace(/{~description}/g, product.description);
   final = final.replace(/{~quantity}/g, product.quantity);
   if (!product.organic) final = final.replace(/{~not-organic}/g, 'not-organic');
   return final;
};
