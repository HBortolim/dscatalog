import "./styles.css";

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card"></div>
      <h1 className="product-crud-form-title">Dados do Produto</h1>
      <form action="">
        <div className="row">
            <div className="col-lg-6">
                <input type="text" name="" id="" className="form-control base-input"/>
                <input type="text" name="" id="" className="form-control base-input"/>
                <input type="text" name="" id="" className="form-control base-input"/>
            </div>
            <div className="col-lg-6">
                <textarea name="" id="" cols={30} rows={10} className="form-control base-input"></textarea>
            </div>
        </div>
        <div className="row">
            <button className="btn btn-outline-danger">Cancelar</button>
            <button className="btn btn-outline-primary">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
