import { Container } from './styles';
import MenuItem from "@material-ui/core/MenuItem";
import { FlagIcon } from "react-flag-kit";
import { Link } from "react-router-dom";

export const CardPlan = (
    {
        valueMenuItem, 
        sizeMenuItem, 
        codeMenuItem, 
        titlePlan, 
        subTitlePlan, 
        pieChart, 
        titleClass, 
        classTotal, 
        MissingClass, 
        resetPlans, 
        titleExtraClass, 
        numberExtra, 
        subResetPlan, 
        href, 
        buttonView, 
    }) => {
    return (
        <Container>
            <div className="bigBox">
                <div className="boxItem">
                    <div className="item">
                        <div className="itensBox dflex">
                            <div>
                                <MenuItem value={valueMenuItem}>
                                    <FlagIcon size={sizeMenuItem} code={codeMenuItem} />
                                </MenuItem>
                                </div>
                                <div>
                                    <h3>{titlePlan}</h3>
                                <span>{subTitlePlan}</span>
                            </div>
                        </div>
                        <div className="itensBox dflex">
                            <div>
                                {pieChart}
                            </div>
                            <div>
                                <div className="dflex mt">
                                    <h3>{titleClass} {" "}</h3>
                                    <h3>
                                        <b>{classTotal}</b> de <b>{MissingClass}</b>
                                    </h3>
                                </div>
                                <h6 className="automaticallyRenews">
                                    {resetPlans}
                                    {subResetPlan}
                                </h6>
                            </div>
                        </div>
                        <div className="containerExtra dflex">
                            <h2 className="extraClasses">{titleExtraClass}</h2>
                            <h2 className="extraNumber">{numberExtra}</h2>
                        </div>
                        <div>
                            <div className="itensBox itensButtons">
                                <Link to={href}>
                                    <button>
                                        {buttonView}{" "}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
} 