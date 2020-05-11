
import React, { Component } from 'react'
import {Tag, Input, Tooltip, Select, message, Button} from 'antd';
import {CloseCircleOutlined, PlusOutlined} from '@ant-design/icons';

import './EditableTagCompoenent.css'
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {notificationStatus, notificationType} from "../../utilities/notificationHandlers";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import SelectOutlined from "@ant-design/icons/lib/icons/SelectOutlined";
import MoneyCollectOutlined from "@ant-design/icons/lib/icons/MoneyCollectOutlined";
import TransactionOutlined from "@ant-design/icons/lib/icons/TransactionOutlined";
import AccountBookOutlined from "@ant-design/icons/lib/icons/AccountBookOutlined";

const { Option, OptGroup } = Select;

export class EditableTagGroup extends React.Component {
    state = {
        tags: ['Type/Status'],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    };

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
        const inputValueIsType = this.props.selectOptions.notificationsTypeArray.includes(removedTag);
        if (inputValueIsType) this.props.sendTypeFromCompoent('');
        else this.props.sendStatusFromComponent('');
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());

    };

    handleInputConfirm = (value) => {
        this.state.inputValue = value;
        let { inputValue } = this.state;
        let { tags } = this.state;
        inputValue = inputValue.trim();
        inputValue = inputValue.replace(/\s\s+/g, ' ');
        inputValue = inputValue.split(' ');
        if (inputValue.length === 2) {
            inputValue = inputValue[0].trim().toUpperCase() +  '_' + inputValue[1].trim().toUpperCase();
        } else inputValue = inputValue[0].trim().toUpperCase();
        const inputValueIsType = this.props.selectOptions.notificationsTypeArray.includes(inputValue);
        const inputValueIsStatus = this.props.selectOptions.notificationsStatusArray.includes(inputValue);
        if (inputValue && tags.indexOf(inputValue) === -1) {
            if (!inputValueIsType && !inputValueIsStatus) {
                message.warning('Misspelled notification type/status!');
            } else if (tags.includes(inputValue.trim().toUpperCase())){
                message.warning('Inputed type/status is already added to tags!');
            }else if(tags.length > 1) {
                // we check first selected tag
                let firstSelect = tags[1];
                let secondSelect = '';
                if (tags.length > 2) secondSelect = tags[2];
                if (inputValueIsType
                    && (this.props.selectOptions.notificationsTypeArray.includes(firstSelect)
                        || this.props.selectOptions.notificationsTypeArray.includes(secondSelect))) {
                    message.warning('You cannot add more than one notification type!')
                } else if (inputValueIsStatus
                    && (this.props.selectOptions.notificationsStatusArray.includes(firstSelect)
                        || this.props.selectOptions.notificationsStatusArray.includes(secondSelect))) {
                    message.warning('You cannot add more than one notification status')
                } else {
                    tags = [...tags, inputValue.trim().toUpperCase()];
                    if (inputValueIsType) this.props.sendTypeFromCompoent(inputValue);
                    else this.props.sendStatusFromComponent(inputValue);
                }
            } else {
                tags = [...tags, inputValue.trim().toUpperCase()];
                if (inputValueIsType) this.props.sendTypeFromCompoent(inputValue);
                else this.props.sendStatusFromComponent(inputValue);
            }
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    getTagColor = (tag) => {
        if (this.props.selectOptions.notificationsTypeArray.includes(tag)) {
            return '#f759ab'
        }
        return (tag === notificationStatus.INFO) ? '#40a9ff'
            : (tag === notificationStatus.WARNING) ? 'warning'
                : (tag === notificationStatus.ERROR) ? 'error'
                    : '#612500'
    }

    getTagIcon = (tag) => {
        if (this.props.selectOptions.notificationsTypeArray.includes(tag)) {
            return (tag === notificationType.TRANSACTION) ? <TransactionOutlined />
                : (tag === notificationType.MONEY_TRANSFER) ? <MoneyCollectOutlined />
                    : (tag === notificationType.ACCOUNT_BALANCE) ? <AccountBookOutlined />
                        : <SelectOutlined />
        }
        return (tag === notificationStatus.INFO) ? <InfoCircleOutlined/>
            : (tag === notificationStatus.WARNING) ? <ExclamationCircleOutlined/>
                : (tag === notificationStatus.ERROR) ? <CloseCircleOutlined/>
                    : <SelectOutlined />
    }


    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <div>
                {tags.map((tag, index) => {

                    const isLongTag = tag.length > 20;

                    const tagElem = (
                        <Tag
                            className={'edit-tag'}
                            icon={this.getTagIcon(tag)}
                            color={this.getTagColor(tag)}
                            key={tag}
                            closable={index !== 0}
                            onClose={() => this.handleClose(tag)}
                        >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    // <Input
                    //     ref={this.saveInputRef}
                    //     type="text"
                    //     size="small"
                    //     className="tag-input"
                    //     value={inputValue}
                    //     onChange={this.handleInputChange}
                    //     onBlur={this.handleInputConfirm}
                    //     onPressEnter={this.handleInputConfirm}
                    //     suffix={
                    //         <Tooltip style={{maxWidth: '300px'}} title={this.getTitle()}>
                    //             <InfoCircleOutlined style={{ color: 'blue' }} />
                    //         </Tooltip>
                    //     }
                    // />
                    <Select
                        ref={this.saveInputRef}
                        size={'small'}
                        className={'tag-input'}
                        placeholder={'Type/Status'}
                        onChange={this.handleInputConfirm}
                    >
                        <OptGroup label={'Notification Type'}>
                            <Option value={'TRANSACTION'}>{'TRANSACTION'}</Option>
                            <Option value={'MONEY_TRANSFER'}>{'MONEY_TRANSFER'}</Option>
                            <Option value={'ACCOUNT_BALANCE'}>{'ACCOUNT_BALANCE'}</Option>
                        </OptGroup>
                        <OptGroup label={'Notification Status'}>
                            <Option value={'INFO'}>{'INFO'}</Option>
                            <Option value={'WARNING'}>{'WARNING'}</Option>
                            <Option value={'ERROR'}>{'ERROR'}</Option>
                        </OptGroup>
                    </Select>
                )}
                {!inputVisible && (
                    <Tag
                        visible={this.state.tags.length < 3}
                        className="site-tag-plus" onClick={this.showInput}
                    >
                        <PlusOutlined /> New Tag
                    </Tag>
                )}
            </div>
        );
    }
}
