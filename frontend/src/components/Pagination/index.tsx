import { ReactComponent as ArrowIcon} from 'assets/img/arrow.svg';
import "./styles.css";

const Pagination = () => {
    return(
        <div className="pagination-container arrow-previous">
            <ArrowIcon className='arrow-inactive'/>
            <div className="pagination-item active">1</div>
            <div className="pagination-item">2</div>
            <div className="pagination-item">3</div>
            <div className="pagination-item">...</div>
            <div className="pagination-item">10</div>
            <ArrowIcon className='arrow-active arrow-next'/>
        </div>
    );
}

export default Pagination;