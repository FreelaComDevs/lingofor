import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AuthService from '../_api/AuthService'
import Services from '../_api/Services'

import { FlagIcon } from "react-flag-kit";
import { translate } from 'react-i18next'
import { Manage, Billing } from './Styles'

class LevelScoreAccount extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            id : 0,
            studentId:0,
            levels:[]    
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        this.callApi = this.callApi.bind(this)
    }

    componentWillMount () {
        let user = this.service.getProfile() 
        this.setState({ id: user.id }, () => {
            if (this.state.id > 0) {
                this.callApi(true)
            }
            return
        })        
    }

    callApi () {
        this.service.noAuthGet(`studentManagement/listStudentLevelGrade?skip=0&take=99999&id=${this.state.id}`)
        .then(res => {
            console.log('studentManagement/listStudentLevelGrade',res)
            if(!res.success || !res.result.items || res.result.items.length == 0)
            {
                return
            }

            this.setState({ levels : res.result.items})
        })
        .catch(err => console.log('ERRO GET USERS ', err))
    }

    render() {
        const { t } = this

        return (
            <div className="box">            
                <div className="boxBig">
                { this.state.levels.map((level,index) => {
                    return (
                        <div key={index} className="itemBox">  
                            
                            <div className="levelTop">
                                <div className="levelTopLinguage">

                                    <div className="boxLanguage">
                                        <h5>LINGO</h5>
                                        <div className="language">
                                            {/* <img src={IconPricing} alt="" width="30" height="20"/> */}
                                            <FlagIcon size={ 35 } code={level.lingoLanguage.flag} />
                                            <h5>{level.lingoLanguage.description}</h5>
                                        </div>
                                    </div>
                                    <div className="columLevel">
                                        <div>
                                            <h5>{t('CARD_PLAN_LEVEL')}</h5>
                                            <h5>{level.level.level}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grades">                                
                                <h6>{t('GRADES')}</h6> 
                                <div>
                                    <h5><span>{t('ORAL')}</span></h5>
                                    <h5>{level.oralGrade}</h5>                                
                                </div>                               
                            </div>
                            <div>
                                <h5><span>{t('WRITING')}</span></h5>
                                <h5>{level.writingGrade}</h5>
                            </div>
                            <div>
                                <h5><span>{t('DICTATION')}</span></h5>
                                <h5>{level.dictationGrade}</h5>
                            </div>
                            <div>
                                <h5><span>{t('AVERAGE')}</span></h5>
                                <h5>{level.averageGrade}</h5>
                            </div>
                            
                        </div>
                    )
                })}
                </div>
            </div>            
        )
    }
}

LevelScoreAccount.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
  }
  
 export default translate('translations')(LevelScoreAccount)