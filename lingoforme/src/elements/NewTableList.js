import React, { cloneElement } from 'react'
import Placeholder from '.././components/_common/placeholder/placeholderByPage';
import TableDataHead from './TableDataHead';

const TableList = ({ listedItems, children }) =>  (
  <div className='new-container'>
    { !listedItems.length
      ? <Placeholder pageName='users' textMsg='No results' /> 
      : <div className='new-box new-box-table-list'>
        <table>
          <tbody>
            <tr>{children.map(({props: {label}},index) => <TableDataHead key={'nTblHead'+index} data={label}/> )}</tr>
            { listedItems.map( (item, index) => 
              <tr key={'nTblRow'+index}>{children.map( (child, index) => 
                cloneElement(child, { key: item.id + item.name + index || child.props.name, id: item.id, data: item[child.props.name] })
              )}</tr>  
            )}
          </tbody>
        </table>
      </div> 
    }
  </div>
)

export default TableList
