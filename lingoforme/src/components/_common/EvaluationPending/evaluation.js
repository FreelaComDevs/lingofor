import { ContainerEvaluationPending } from './styles';
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Services from '../../../components/_api/Services';
const service = new Services();

const EvaluationPending = () => {

  useEffect(() => {
    getClassesForRating()
  }, [])

  const[value, foundTotal] = useState();

  const getClassesForRating = () => {
    service.ApiGetParams("ClassScheduleRating")
      .then( async res => { 

        foundTotal(res.result.totalFound*2);
      })
      .catch( res => console.log(res))
  }
  
  return (
        <ContainerEvaluationPending>
            <Link to="/class-rating">
                <div className="card-evaluation-pending">
                <div className="text-card">{"Avaliações Pendentes"}</div>
                <div className="number-card">{value > "10" ? "10" : value}</div>
                </div>
            </Link>
        </ContainerEvaluationPending>
    );
};

const mapStateToProps = ({ user, lingo }) => ({ user, lingo });

export const Evaluation = connect(mapStateToProps)(EvaluationPending)
