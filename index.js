const express = require('express')
const app = express();


app.post('/createdraft',async (req,res)=>{
  try{
    console.log('started')
    let products = req.body?.products

    products = [...products,
       {title:"Shipping Insurance",
        quantity:1,
         originalUnitPrice:5,
        }]
        const shop = 'bagstogogo.myshopify.com';
        const accessToken = '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';
const url = `https://${shop}/admin/api/2023-04/graphql.json`;
const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': accessToken,
};
console.log(products)
const body = {
  query: `
  mutation CreateDraftOrder($lineItems: [DraftOrderLineItemInput!]!) {
    draftOrderCreate(input: {
      lineItems: $lineItems
    }) {
      draftOrder {
        id
        order {
          id
        }
        invoiceUrl
      }
      userErrors {
        field
        message
      }
    }
  }
  `,
  variables:{
    lineItems:products
  }
};

const data =await fetch(url,{

  method:'POST',
    body:JSON.stringify(body),
    headers:headers
})
res.json(await data.json())
}
catch(err){
  console.log(err)
    res.json(err)
}

})

app.listen(3000, ()=>{
    console.log('server is running on 3000')
})

Paste your content here to scan...
SCAN
