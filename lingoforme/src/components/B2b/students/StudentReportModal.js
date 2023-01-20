import React, { Component } from 'react';
import { translate } from 'react-i18next'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import util from './util';
import FileSaver from 'file-saver';


import './styles.scss';


class StudentReportModal extends Component {
    constructor(props) {
        super(props)
        const months = util.getMonths();
        const years = util.getYearsByYearInterval(5);

        this.state = {
            dialog: {
                opened: false,
                title: '',
                message: '',
                onClose: () => console.log('You should implement the onClose function.')
            },
            months: months,
            years: years,
            year: '',
            month: '',
            language: '',
            yearSelectClasses: ['input-lingo'],
            yearLabelClasses: '',
            monthSelectClasses: ['input-lingo'],
            monthLabelClasses: '',
            languageLabelClasses: '',
            error: ''
        }

    }


    componentDidMount = () => {
        const dialog = {
            opened: true,
            title: 'Export student report',
            message: '',
            onClose: () => {
                this.handleBack();
            }
        }
        this.setState({ dialog: dialog });
    }

    handleBack = () => {
        const d = { ...this.state.dialog, opened: false }
        this.setState({ dialog: d });

        this.props.setParentState({
            showStudentReport: false
        });
    }

    handleChange = e => {
        
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.name + 'SelectClasses']: 'input-lingo',
            [e.target.name + 'LabelClasses']: '',
            [e.target.name + 'language']: '',
            error: ''
        }
        );
    }

    generateReport = () => {
        this.props.setParentState({ loading: true });

        const filters = Object.freeze({
            studentId: this.props.student.students[0].id,
            month: this.state.month,
            year: this.state.year,
            language: this.state.language
        });

        if (this.validFilters()) {
            this.props.apiClient.generateStudentReport(filters)
                .then(response => {
                    if (response.headers['content-type'] === 'application/zip') {
                        var blob = new Blob([response.data]);
                        FileSaver.saveAs(blob, "report.zip");
                    }
                    else {
                        this.setState({ error: 'This student has no data in this period to generate a report!' });
                    }

                }).catch(e => {
                    this.setState({ error: 'Error generating report', loading: false });
                })
                .then(response => {
                    this.props.setParentState({ loading: false });
                });
        }
    }

    validFilters = () => {
        let valid;
        if (this.state.month === '') {
            this.setState({ 'monthSelectClasses': 'input-lingo input-red' });
            this.setState({ 'monthLabelClasses': 'label-red' });
            valid = false;
        }
        else {
            this.setState({ 'monthSelectClasses': 'input-lingo' });
            this.setState({ 'monthLabelClasses': '' });
            valid = true;
        }

        if (this.state.year === '') {
            this.setState({ 'yearSelectClasses': 'input-lingo input-red' });
            this.setState({ 'yearLabelClasses': 'label-red' });
            valid = false;
        }
        else {
            this.setState({ 'yearSelectClasses': 'input-lingo' });
            this.setState({ 'yearLabelClasses': '' });
            valid = valid && true;
        }

        if (this.state.year === '') {
            this.setState({ 'yearSelectClasses': 'input-lingo input-red' });
            this.setState({ 'yearLabelClasses': 'label-red' });
            valid = false;
        }
        else {
            this.setState({ 'yearSelectClasses': 'input-lingo' });
            this.setState({ 'yearLabelClasses': '' });
            valid = valid && true;
        }

        if (this.state.language === '') {
            this.setState({ 'languageSelectClasses': 'input-lingo input-red' });
            this.setState({ 'languageLabelClasses': 'label-red' });
            valid = false;
        }
        else {
            this.setState({ 'languageSelectClasses': 'input-lingo' });
            this.setState({ 'languageLabelClasses': '' });
            valid = valid && true;
        }

        return valid;

    }

    render() {
        const { dialog } = this.state;
        const { t, student } = this.props;
        return (
            <div>
                <Dialog open={dialog.opened} onClose={dialog.onClose} className="alert-dialog-slide report-modal">
                    <DialogTitle className="alert-dialog-slide-title">
                        {dialog.title}
                    </DialogTitle>
                    <DialogContent className="alert-dialog-slide-content">
                        <p className="margin-top-20">
                            <span className="font-weight-400" >Student:</span>{student.name}
                        </p>
                        <span className="margin-top-30">Select report year and month:</span>
                        <div className='lineInputs margin-top-20'>
                            <div className="item">
                                <div>
                                    <label className={this.state.yearLabelClasses}>{t('Year')}</label>
                                    <span className="span">{t('REQUIRED')}</span>
                                </div>
                                <select
                                    onChange={this.handleChange}
                                    className={this.state.yearSelectClasses}
                                    name='year'>
                                    <option value="">Year</option>
                                    {this.state.years.map(item => {
                                        return <option key={item} value={item}>{item}</option>
                                    })}
                                </select>
                            </div>
                            <div className="item">
                                <div>
                                    <label className={this.state.monthLabelClasses}>{t('Month')}</label>
                                    <span className="span">{t('REQUIRED')}</span>
                                </div>
                                <select
                                    onChange={this.handleChange}
                                    className={this.state.monthSelectClasses}
                                    name='month'>
                                    <option value="">Month</option>
                                    {this.state.months.map(item => {
                                        return <option key={item.value} value={item.value}>{item.description}</option>
                                    })}
                                </select>
                            </div>

                            <div>
                                <div>
                                    <label className={this.state.languageLabelClasses}>{t('REPORT_LANGUAGE')}</label>
                                    <span className="span">{t('REQUIRED')}</span>
                                </div>
                                <select
                                    onChange={this.handleChange}
                                    name='language'
                                    value={this.state.language}
                                    className={this.state.languageSelectClasses}
                                >
                                    <option value="">{t('REPORT_LANGUAGE')}</option>
                                    <option value="portuguese">{t('BTN_PORTUGUESE')}</option>
                                    <option value="english">{t('BTN_ENGLISH')}</option>
                                    <option value="spanish">{t('BTN_SPANISH')}</option>
                                </select>
                            </div>
                        </div>
                        <label className="label-red">{this.state.error}</label>
                    </DialogContent>
                    <DialogActions className="alert-dialog-slide-actions">
                        <button className="new-button close" onClick={() => this.handleBack()}>
                            {t('CANCEL')}
                        </button>
                        <button className="new-button" onClick={() => this.generateReport()} autoFocus>
                            {t('GENERATE_REPORT')}
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}



export default (translate('translations')(StudentReportModal));