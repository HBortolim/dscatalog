import { ReactComponent as ArrowIcon } from "assets/img/arrow.svg";
import axios from "axios";
import ProductPrice from "components/ProductPrice";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "types/product";
import { BASE_URL } from "util/requests";
import "./styles.css";

type UrlParams = {
  productId: string;
}

const ProductDetails = () => {

  const { productId } = useParams<UrlParams>();
  // atributo e função para armazenar o estado
  const [product, setProduct] = useState<Product>();
  // na montagem do componente => funcao que quer executar e uma lista de dependencias(a lista de objetos que quer observar e qnd ele alterar, vai rodar a função de novo)
  useEffect(() => {
    axios.get(`${BASE_URL}/products/${productId}`)
    .then(response => {
      setProduct(response.data);
    });
  }, [productId]); 

  return (
    <div className="product-details-container">
      <div className="product-details-card base-card">
        <Link to="/products">
          <div className="goback-container">
            <ArrowIcon />
            <h2>Voltar</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src={product?.imgUrl}
                alt={product?.name}
              />
            </div>
            <div className="name-price-container">
              <h1>{product?.name}</h1>
              {/*vai renderizar se isso for verdade*/}
              {product && <ProductPrice price={product?.price} />}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>{product?.description}</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laborum eaque recusandae mollitia cum! Eaque enim doloribus
                nulla labore vel laboriosam consequuntur, eveniet voluptatem
                alias optio, corporis magni ad! Laudantium, itaque! Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Culpa omnis nam
                cumque soluta sequi magnam vitae optio eaque consequuntur
                beatae, alias iusto labore, dolores minima tempore at natus
                nihil accusantium!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
