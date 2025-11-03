import client from "../config/elasticSearch.js";
import db from "../config/db.js";
export const createProIndex = async () => {
  try {
    const exists = await client.indices.exists({ index: 'products' });
     if (!exists) {
      await client.indices.create({
        index: 'products',
        body: {
          mappings: {
            properties: {
              productId: { type: 'keyword' },
              productName: { type: 'text' },
              productDes: { type: 'text' },
              MRP: { type: 'integer' },
              discount: { type: 'integer' },
              quantity: { type: 'integer' },
              categoryId: { type: 'keyword' }
            }
          }
        }
      });
      console.log("Product index created!");
    }
  }
  catch(err){
      console.error("Error in creating product index:", err);
  }
}
export const indexingProduct = async () => {
  db.query("SELECT * FROM Products", (err, results) => {
    if (err) return console.error(err);
    results.forEach(product => {
        client.index({
        index: 'products',
        id: product.productId,
        document: product
      },(err,res)=>{
        if(err) console.error(err);
      });
    });
    client.indices.refresh({ index: 'products' }, (err, res) => { 
    if(err){
      console.error(err);
    }
    else{
    console.log(`${results.length} products indexed into Elasticsearch`);
    }
  });
  });
};
export const searchProducts = async (req, res) => {
  const query = req.query.q || '';
  try {
    const searchResult = await client.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['productName^3', 'productDes'], 
            fuzziness: 'AUTO'
          }
        }
      }
    });
     const products = searchResult.hits.hits.map(hit => hit._source);
    res.json({ query, results: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

