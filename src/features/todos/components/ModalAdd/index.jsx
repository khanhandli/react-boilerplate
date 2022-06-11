import { postDataAPI } from '@/apis';
import RichCkeditor from '@/components/Editor/RichCkeditor';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Notification } from '@/utils';

const dateFormat = 'DD/MM/YYYY';

const ModalAdd = ({ open, setOpenModalAdd, callback, setCallback, labels }) => {
    const [body, setBody] = React.useState('Nhập mô tả');

    const [form] = Form.useForm();

    const onClose = () => {
        setOpenModalAdd(!open);
    };

    const onFinish = async (data) => {
        let options = {};
        if (data?.options && data.options.length > 0) {
            data.options.forEach((element) => {
                options = { ...options, [element]: true };
            });
        }

        const dataSend = {
            title: data.title,
            notes: body,
            startDate: moment(data.startDate).format('DD/MM/YYYY'),
            dueDate: moment(data.dueDate).format('DD/MM/YYYY'),
            ...options,
            labels: JSON.stringify(data.labels),
            users: data.users,
        };

        const res = await postDataAPI('v2/todos', dataSend);
        if (res.status === 201) {
            setCallback(!callback);
            Notification('success', res.data.message);
            form.resetFields();
            setOpenModalAdd(false);
        }
    };

    return (
        <Modal
            onCancel={onClose}
            visible={open}
            title="Thêm công việc"
            onOk={() => {
                console.log('oke');
            }}
            style={{ zIndex: 2600 }}
            maskClosable={false}
            width={700}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                <Form.Item
                    name="title"
                    label="Tên công việc"
                    rules={[{ required: true, message: 'Hãy nhập tên công việc!' }]}
                >
                    <Input placeholder="Tên công việc" />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <RichCkeditor body={body} setBody={setBody} />
                </Form.Item>
                <Row style={{ flexDirection: 'row' }}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            initialValue={moment('2015/01/01', dateFormat)}
                            name="startDate"
                            label="Ngày bắt đầu"
                        >
                            <DatePicker className="gx-w-100" format={dateFormat} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item initialValue={moment('2015/01/01', dateFormat)} name="dueDate" label="Đến hạn">
                            <DatePicker className="gx-w-100" format={dateFormat} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ flexDirection: 'row' }}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="labels"
                            label="Nhãn"
                            rules={[{ required: true, message: 'Hãy chọn nhãn công việc!' }]}
                        >
                            {labels.length > 0 ? (
                                <Select mode="multiple" placeholder="Lựa chọn nhãn">
                                    {labels.map((label) => (
                                        <Select.Option key={label.id} value={label.id}>
                                            {label.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            ) : (
                                <></>
                            )}
                        </Form.Item>
                        <Form.Item name="users" label="Người phụ trách">
                            <Select mode="multiple" placeholder="Lựa chọn thành viên">
                                <Select.Option value="red">Red</Select.Option>
                                <Select.Option value="green">Green</Select.Option>
                                <Select.Option value="blue">Blue</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item name="options" label="Lựa chọn">
                            <Checkbox.Group className="gx-w-100">
                                <Row gutter={[0, 8]}>
                                    <Col>
                                        <Checkbox value="starred">Gắn sao</Checkbox>
                                    </Col>
                                    <Col>
                                        <Checkbox value="important">Quan trọng</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Tạo công việc
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

ModalAdd.propTypes = {
    open: PropTypes.bool,
    setOpenModalAdd: PropTypes.func,
    body: PropTypes.object,
    setBody: PropTypes.func,
};

export default ModalAdd;
