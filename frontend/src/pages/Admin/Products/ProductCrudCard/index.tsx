import { AxiosRequestConfig } from "axios";
import ProductPrice from "components/ProductPrice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Product } from "types/product";
import { requestBackend } from "util/requests";
import CategoryBadge from "../CategoryBadge";

import "./styles.css";

type Props = {
  product: Product;
  onDelete: Function;
};

const ProductCrudCard = ({ product, onDelete }: Props) => {
  const handleDelete = (productId: number) => {

    if(!window.confirm("Tem certeza que deseja excluir?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/products/${productId}`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      toast.success('Produto apagado com sucesso!', {
        autoClose: 2000,
      });
      onDelete();
    });
  };

  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-top-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div className="product-crud-card-description-container">
        <div className="product-crud-card-bottom-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>
        <div className="product-crud-categories-container">
          {product.categories.map((category) => (
            <CategoryBadge name={category.name} key={category.id} />
          ))}
        </div>
      </div>
      <div className="product-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(product.id)}
          className="btn btn-outline-danger product-crud-card-button product-crud-card-button-first"
        >
          Excluir
        </button>
        <Link to={`/admin/products/${product.id}`}>
          <button className="btn btn-outline-secondary product-crud-card-button">
            Editar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCrudCard;
