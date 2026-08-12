import { useEffect,useState } from "react";

function UseAllApi(){
     const [products, setProducts] = useState([]);
      const [shirt,setShirt] = useState([]);
      const [shoes,setShoes] = useState([])
    
    // api for shirts
      useEffect(() => {
      fetch("https://dummyjson.com/products/category/mens-shirts")
        .then(res => res.json())
        .then((data) => {
          setShirt(data.products);
        });
    }, []);
    

     // api for Shoses
      useEffect(() => {
        Promise.all([
          fetch("https://dummyjson.com/products/category/mens-shoes").then(res => res.json()),
          fetch("https://dummyjson.com/products/category/womens-shoes").then(res => res.json())
        ])
        .then(([menData, womenData]) => {
          const allShoes = [...menData.products, ...womenData.products];
          setShoes(allShoes);
        });
      }, []);
    
     useEffect(()=>{
       setProducts([...shirt,...shoes])
     },[shirt,shoes])

     return products;
}

export {UseAllApi};