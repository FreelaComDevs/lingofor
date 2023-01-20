import React, { Component } from 'react'
import { translate } from 'react-i18next'
import Rating from 'react-rating'
import Services from '../_api/Services'
import PropTypes from 'prop-types'

import { FlagIcon } from "react-flag-kit"

class RatingStudent extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            loadedStudent: false,
            languagesbylevel: [],
            loadedLanguages: false
        }

        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()
        this.userId = this.props.userId
    }


    componentWillMount () {   
        this.service.noAuthGet(`studentManagement/getbyuser/${this.userId}`)
        .then(res => {
            if(!res.success || !res.result.items || res.result.items.length === 0)
            {
                return
            }
            this.setState({ loadedStudent:true, student : res.result.items[0] })
        })
        .catch(err => console.log('ERRO GET USERS ', err))

        this.service.noAuthGet(`studentManagement/listStudentLevelGrade?skip=0&take=99999&id=${this.userId}`)
        .then(res => {
            if(!res.success || !res.result.items || res.result.items.length ===0)
            {
                return this.setState({ loading: false})
            }
            let languagesbylevel = []
            res.result.items.map((level,i) =>{
                let indexLang = -1
                languagesbylevel.map((lang,index) =>{
                    if(lang.lingoLanguageId === level.lingoLanguageId)
                        indexLang = index
                })

                if(indexLang === -1){
                    languagesbylevel.push(level)
                }
            })

            this.setState({ loadedLanguages:true, languagesbylevel : languagesbylevel, loading: false})
        })
        .catch(err => console.log('ERRO GET USERS ', err))

    }


    render() {
        const { t } = this.props
        return (
            this.state.loadedStudent &&  this.state.loadedLanguages &&
            <div className="rating-box">
                <div className="teacher-info">
                    <h2>{this.state.student.name}</h2>
                    <p>Native language: {this.state.student.students[0].studentLanguages.length > 0 ? this.state.student.students[0].studentLanguages[0].language.name : ''}</p>
                    <p>Country: {this.state.student.country.name}</p>
                </div>
                <div>
                    <h2>{t('AVARAGE_RATING')}</h2>
                    <div className="ContentRating">
                    { this.state.languagesbylevel.map((language, index)=>{
                        return (
                            
                                <div key={index} className="teacher-rating">
                            
                                    <div className="items"> 
                                        <FlagIcon size={ 24 } code={language.lingoLanguage.flag} />
                                        <h5>{language.lingoLanguage.description}</h5>
                                    </div>
                                    <p>
                                        <span className="rating">{language.student.averageRating}</span>
                                        { language.student.averageRating && <Rating
                                            emptySymbol="fa fa-star-o fa-2x"
                                            fullSymbol="fa fa-star fa-2x"
                                            initialRating={language.student.averageRating}
                                            readonly = {true} 
                                        /> }
                                    </p>
                                    
                                </div>
                            
                            )
                        })
                        
                    }
                    </div>
                </div>
                
            </div>
        )
    }
}

RatingStudent.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object,
    userId: PropTypes.number.isRequired
}
  
 export default translate('translations') (RatingStudent)