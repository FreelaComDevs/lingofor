import React, { Component } from 'react';

import { translate } from 'react-i18next'
import queryString from 'query-string'

import './styles.scss'

class Pagination extends Component {

    constructor(props){
        super(props)
        this.state = {
            pageInitial: 1,
            pageCurrent: 1,
            pageSize: 10,
            maxShowPage: 11
        }
    }

  navigation = (page, dontSalt, back) => {     
    const{ totalPages } = this.props;
    
    //if(page > totalPages || page < 1) return

    page = page > totalPages ? totalPages : page
    page = page < 1 ? 1 : page

    const {onClick} = this.props
    const objState = {pageCurrent:page}
    this.setState(objState)
    
    // if(!dontSalt){
    //     const addPage = back ? page : page+9
    //     this.setState({pageInitial:back ? page - 9 : page})
    //     this.setState({pageLimit:page < totalPages ? addPage : page})
    // }

    onClick(page)
    window.history.pushState('Object', 'Categoria JavaScript', '?page='+page);
  }

  render() {
    const{ totalPages, t } = this.props;
    let { maxShowPage, pageInitial, pageCurrent } = this.state;
    pageCurrent = this.props.pageCurrent || pageCurrent
    let pageSize = this.props.pageSize || this.state.pageSize
    let totalFound = this.props.totalFound || 0;
    let saveTotalFound;
    let saveInitialFound;
    if(localStorage.getItem("savePage") === null){
      localStorage.setItem("savePage", pageCurrent);
      localStorage.setItem("saveTotalFound", totalFound);
      saveTotalFound = this.props.totalFound;
      saveInitialFound = 1;
    }else{
      const page = localStorage.getItem("savePage");
      if(pageCurrent === 1){
        localStorage.setItem("saveTotalFound", totalFound);
        saveTotalFound = this.props.totalFound;
        saveInitialFound = 1;
      }else{
        if(parseInt(page) < parseInt(pageCurrent)){
          //soma
          saveTotalFound = parseInt(this.props.totalFound) + parseInt(localStorage.getItem("saveTotalFound"));
        }else{
          //menos
          saveTotalFound = parseInt(this.props.totalFound) - parseInt(localStorage.getItem("saveTotalFound"));
        }
        saveInitialFound = localStorage.getItem("saveTotalFound");
      }
    }
    
    let listInitial = pageCurrent > 1 ? ((pageCurrent-1) * pageSize + 1) : 1 
    let listFinal = (pageCurrent * pageSize) < totalFound ? (pageCurrent * pageSize) : totalFound
    let maxPage = maxShowPage > totalPages ? totalPages : maxShowPage
    maxPage = pageCurrent+((maxShowPage-1)/2) > totalPages ? totalPages :  pageCurrent+((maxShowPage-1)/2)
    let minPage = pageCurrent-((maxShowPage-1)/2) < 1 ? 1 : pageCurrent-((maxShowPage-1)/2)
    const pages = []
    for(let i=minPage; i <= maxPage; i++){
        pages.push(i)
    };
    
    return(
        <div className="boxPagination">
            <span>{t('SHOWING')} {saveInitialFound}-{ saveTotalFound } {t('SHOWING_OF')} {saveTotalFound}</span>

            <ul className="pagination">
                { pageCurrent > 1 && <li><a onClick={()=> this.navigation(1)}><i className="fa fa-angle-double-left" aria-hidden="true"></i></a></li>}
                <li><a onClick={()=> this.navigation(pageCurrent-(maxShowPage-1), pageCurrent < totalPages ? true : false,true)}><i className="fa fa-angle-left" aria-hidden="true"></i></a></li>
                {
                    pages &&
                    pages.map((item,i) => {
                        return(
                            <li key={'page'+i} ><a  onClick={() => this.navigation(item, true)} className={pageCurrent === item ? "active": ""}>{item}</a></li>
                        )
                    })
                }
                
                <li><a onClick={()=> this.navigation(pageCurrent+(maxShowPage-1))}><i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
                { pageCurrent < totalPages &&  <li><a  onClick={()=> this.navigation(totalPages)}><i className="fa fa-angle-double-right" aria-hidden="true"></i></a></li>}
            </ul>
        </div>
    );
  }
}

export default translate('translations')(Pagination)
