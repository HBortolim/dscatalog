import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Product } from "types/product";
import { requestBackend } from "util/requests";
import "./styles.css";

const Form = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl:
        "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/7-big.jpg",
      categories: [{ id: 1, name: "" }],
    };
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/products",
      data,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      history.push("/admin/products");
    });
  };

  const handleCancel = () => {
    history.push("/admin/products");
  };
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">Dados do Produto</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register("name", {
                    required: "Campo obrigatório",
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Nome do Produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register("price", {
                    required: "Campo obrigatório",
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.price ? "is-invalid" : ""
                  }`}
                  placeholder="Preço"
                  name="price"
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  {...register("description", {
                    required: "Campo obrigatório",
                  })}
                  className={`form-control base-input h-auto ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  placeholder="Descrição"
                  name="description"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button className="btn btn-primary product-crud-button text-white">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;