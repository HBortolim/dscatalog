import { ReactComponent as ArrowIcon} from 'assets/img/arrow.svg';
import ProductPrice from 'components/ProductPrice';
import './styles.css';


const ProductDetails = () => {

    return(
        <div className="product-details-container">
            <div className="product-details-card base-card">
                <div className="goback-container">
                    <ArrowIcon/>
                    <h2>Voltar</h2>
                </div>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="img-container">
                            <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/25-big.jpg" alt="Nome do Produto" />
                        </div>
                        <div className="name-price-container">
                            <h1>Nome do Produto</h1>
                            <ProductPrice price={2345.67}/>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="description-container">
                            <h2>Descrição do Produto</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum eaque recusandae mollitia cum! Eaque enim doloribus nulla labore vel laboriosam consequuntur, eveniet voluptatem alias optio, corporis magni ad! Laudantium, itaque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa omnis nam cumque soluta sequi magnam vitae optio eaque consequuntur beatae, alias iusto labore, dolores minima tempore at natus nihil accusantium!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;