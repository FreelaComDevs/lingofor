import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom'
import { TableUser } from '../PlansAndPrices/styles';


class CoordinatorsList extends Component {

    getNativeLanguageName (item) {
        const languages = item.coordinatorLanguages || []
        const native = languages.filter(lang => {
            return lang.isNative;
        }).reduce((result, lang) => {
            result.push(lang.language.name);
            return result;
        }, [])
        return native;
    }

    getCoordinatedLanguagesNames (item) {
        const coordinated = item.coordinatorLanguageResponsibles || []
        const languages = coordinated.filter(lang => {
            return lang.lingoLanguage !== null;
        }).map(lang => {
            return lang.lingoLanguage.language.name;
        });
        return languages.join(', ');
    }

    getOtherLanguagesNames (item) {
        const languages = item.coordinatorLanguages || []
        const others = languages.filter(lang => {
            return ! lang.isNative;
        })
        .map(lang => {
            return lang.language.name;
        });
        return others.join(', ');
    }

    render() {
        const { items, t } = this.props;

        return (
            <TableUser>
                <div className='container'>
                    <div className='bigBox'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>{t('NAME')}</th>
                                    <th>{t('NATIVE_LANGUAGE')}</th>
                                    <th>{t('OTHER_LANGUAGES')}</th>
                                    <th>{t('LINGO_THAT_COORDINATES')}</th>
                                    <th>{t('COUNTRY')}</th>
                                    <th>Status</th>
                                </tr>
                           
                                {items.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.user.name}</td>
                                            <td>{this.getNativeLanguageName(item)}</td>
                                            <td>{this.getOtherLanguagesNames(item)}</td>
                                            <td>{this.getCoordinatedLanguagesNames(item)}</td>
                                            <td>{item.user.country.name}</td>
                                            <td><span className={(!item.active) ? 'inativo' : ''}>{(item.active) ? 'Active' : 'Inactive'}</span></td>
                                            <td>
                                                <Link to={{ pathname: '/coordinator/' + item.id, state: { info: item }}} >
                                                    <button>View <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </TableUser>
        )
    }
}

export default translate('translations')(CoordinatorsList)
