import React, { Component } from 'react';

export default class Language extends Component {

  fieldName = 'studentLanguages';

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  addFieldInList = () => {
    const { item, actions } = this.props
    const list = [...item[this.fieldName]];
    list.push({
      languageId: '',
      isNative: false
    });
    actions.changeItem({ [this.fieldName]: list });

    console.log('list', list)
  }
  removeItemArray = (array, index) => {
    const obj = null;
    array[index] = obj;
    let arr = [];
    array.forEach((item) => {
       if (item !== null) {
          arr.push(item);
       }
    });
    return arr;
 };

  removeFieldInList = e => {
    const { item, actions } = this.props
    let list = [...item[this.fieldName]];
    const index = e.target.dataset.index;
    console.log('list 0 remove', list)

    list = this.removeItemArray(list, index);
    console.log('list 1 remove', list)

    // list.splice(e.target.dataset.index, 1);
    actions.changeItem({ [this.fieldName]: list });
    console.log('list 2 remove', list)
    console.log('index remove', index)
  }

  handleChangeInList = (e) => {
    const { name, value, dataset } = e.target;
    const val = parseInt(value)
    let { index } = dataset;
    let list = [...this.props.item[this.fieldName]];
    
    console.log('list 1', list)
    // const listFilter = list.filter(listItem => {
    //   return listItem.languageId === val
    // })

    // list = listFilter ? listFilter : list

    list[index][name] = val;
    list[index]['isNative'] = false;
    console.log('list 2', list)

    this.props.actions.changeItem({ [this.fieldName]: list });
  }

  handleChangeInListNative = (e) => {
    const { name, value, dataset } = e.target;
    const val = parseInt(value)
    const { index } = dataset;
    let list = [...this.props.item[this.fieldName]];
    // console.log('list 1', list)
    // someArray.remove(function(el) { return el.Name === "Kristian"; });
    // list = list.filter(listItem => {
    //   return listItem.isNative === true
    // })


    list[index][name] = val;
    list[index]['isNative'] = true;
    // console.log('idiomaAtual',idiomaAtual)

    

    console.log('val 2', list)
    this.props.actions.changeItem({ [this.fieldName]: list });
  }
  async componentDidMount() {
    const items = await this.props.apiClient.fetchLanguages();
    if (! this.props.item.id) {
      const list = [{
        languageId: items.length > 0 ? items[0].id : '',
        isNative: true
      }];
      this.props.actions.changeItem({ [this.fieldName]: list });
    }
    this.setState({ items });
  }

  nativeLanguage = () =>{
    const { t } = this.props;
    const student = this.props.item;
    const listNative = student[this.fieldName]
    // .filter(listItem => {
    //   return listItem.isNative === true
    // })

    const newList = listNative.sort((a, b) => {
      return (a.isNative === b.isNative)? 0 : a.isNative? -1 : 1;
    });

    return (
      <div>
        {newList.map((item, index) => {
          if(item.isNative === false) return null;
          console.log("nativeLang === ", newList, item, index)

          return (
            <div key={'l'+index} className='lineInputs'>
              <div>
                <label>{t('NATIVE_LANGUAGE')}</label>
                <span>{t('REQUIRED')}</span>
              </div>

              <select
                value={item.languageId}
                onChange={this.handleChangeInListNative}
                className='input-lingo mediumSelect'
                name='languageId'
                data-index={index}
              >
                {this.state.items.map(i => {
                  return (<option value={i.id} key={i.id}>{i.name}</option>)
                })}
              </select>

              {index === 0 && 
                <button
                  className='addInput'
                  style={{width: '150px'}}
                  onClick={this.addFieldInList}
                >
                  {t('ADD_LANGUAGE')} +
                </button>}

              {/* {index > 0 && 
                <button
                  data-index={index}
                  className='delete'
                  onClick={this.removeFieldInList}
                >
                  {t('DELETE')}
                </button>} */}
            </div>
          )
        })}
      </div>
    )
  }

  otherLanguage = () =>{
    const { t } = this.props;
    const student = this.props.item;
    const listOther = student[this.fieldName]
    // .filter(listItem => {
    //   return listItem.isNative === false
    // })
    const newList = listOther.sort((a, b) => {
      return (a.isNative === b.isNative) ? 0 : a.isNative? -1 : 1;
    });
    return (
      <div>
        {newList.map((item, index) => {
          if(item.isNative === true) return null;
          console.log("otther === ", newList, item, index)
          return (
            <div key={'l'+index} className='lineInputs'>
              <div>
                <label>{ t('OTHER_LANGUAGE') }</label>
                <span>{t('REQUIRED')}</span>
              </div>

              <select
                value={item.languageId}
                onChange={this.handleChangeInList}
                className='input-lingo mediumSelect'
                name='languageId'
                data-index={index}
              >
                <option>Select</option>
                {this.state.items.map(i => {
                  return (<option value={i.id} key={i.id}>{i.name}</option>)
                })}
              </select>

              { 
                <button
                  data-index={index}
                  data-id={item.languageId}
                  className='delete'
                  onClick={this.removeFieldInList}
                >
                  {t('DELETE')}
                </button>}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { t } = this.props;
    const student = this.props.item;
   
    return (
      
      <div>
        {this.nativeLanguage()}
        {this.otherLanguage()}
      </div>
    )
  }
}
