import { ContainerEvaluationPending } from './styles';
import { Link } from 'react-router-dom'

export const EvaluationPending = ({href, name, number}) => {
    return (
        <ContainerEvaluationPending>
            <Link to={href}>
                <div className="card-evaluation-pending">
                <div className="text-card">{name}</div>
                <div className="number-card">{number}</div>
                </div>
            </Link>
        </ContainerEvaluationPending>
    );
}