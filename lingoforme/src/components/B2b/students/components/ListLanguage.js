import React, { Component, Fragment } from 'react';


export default class ListLanguage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            languages : []
        };
    }

    async componentDidMount() {
        const languages = await this.props.apiClient.fetchLingoLanguages();
        this.setState({ languages });
      }

    handleSelects = (name, value, index) =>{
        this.props.onChangeLanguages(name, value, index);
    }
    

 render(){
    const { t, onChange, selectedPlan, studentPlanLanguages, student, level } = this.props;
    const { languages } = this.state
    return(
        <Fragment>
        { studentPlanLanguages.map((lang,index) => {
            let level = 0
            if (this.props.level){
              level = this.props.level
            } else {level = lang.studentLanguageLevel}
            return(
                <div style={{display:'flex'}} key={"language-"+index}>
                    <div className='lineInputs'>
                    <div>
                        <label>{t('LINGO')}</label>
                        <span>{t('REQUIRED')}</span>
                    </div>
                    <select
                        value={lang.lingoLanguageId}
                        onChange={(e) => this.handleSelects("lingoLanguageId",Number(e.target.value),index)}
                        className='input-lingo mediumSelect'
                        name="studentPlanLanguage.lingoLanguageId"
                        disabled={studentPlanLanguages.length > 1 ? true : false}
                    >
                        {languages.map(i => {
                            return <option key={i.id*9} value={i.id}>{i.language.name}</option>
                        })}
                    </select>
                    </div>

                    <div className='lineInputs'>
                    <div>
                        <label>{t('COURSE_FOCUS_FORM')}</label>
                    </div>
                    <select
                        value={lang.focus}
                        onChange={(e) => this.handleSelects("focus", e.target.value,index)}
                        className='input-lingo smallSelect'
                        name="studentPlanLanguage.focus"
                    >
                        <option>Select</option>
                        <option value="traditional">Traditional</option>
                        <option value="business">Business</option>
                    </select>
                    </div>

                    <div className='lineInputs'>
                    <div>
                        <label>{t('COURSE_STRUCT')}</label>
                    </div>
                    <select
                        value={lang.struct}
                        onChange={(e)=> this.handleSelects("struct" , e.target.value,index)}
                        className='input-lingo smallSelect'
                        name="studentPlanLanguage.struct"
                    >
                        <option>Select</option>
                        <option value="balanced">Balanced</option>
                        <option value="grammatical">Grammatical</option>
                        <option value="conversational">Conversational</option>
                    </select>
                    </div>

                    <div className="lineInputs">
                        <div>
                        <label>{t('LEVEL')}</label>
                        </div>
                        <select
                        style={{width:'100px'}}
                        value={level}
                        name='studentPlanLanguage.studentLanguageLevel'
                        onChange={(e) => this.handleSelects("studentLanguageLevel", Number(e.target.value),index)}
                        >
                        <option value="0">Select</option>
                        <option value="1">A0</option>
                        <option value="2">A1</option>
                        <option value="3">A2</option>
                        <option value="4">B1</option>
                        <option value="5">B2</option>
                        <option value="6">C1</option>
                        <option value="7">C2</option>
                        <option value="8">DM</option>
                        </select>
                    </div>
                </div>
            )})
        }
        </Fragment>
    )
    }
}
