import React, {useEffect} from 'react'
import { Modal, Result, Button, Form, InputNumber, Input, Radio, Select } from 'antd'
import styles from '../index.less';
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const OperationModal = (props) => {
  const [ form ] = Form.useForm()
  const { visible, current, done, onDone, onCancel, onSubmit, firstLevelList} = props

  useEffect(() => {
    if (form && !visible) {
      form.resetFields()
    }
  }, [props.visible])

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current
      })
    }
  }, [props.current])

  const handleSubmit = () => {
    if (!form) {
      return
    }
    form.submit()
  }

  const handleFinish = () => {
    if (onSubmit) {
      onSubmit(form.getFieldValue())
    }
  }

  const handleFirstLevel = (classify) => {
    classify = JSON.parse(classify)
    form.setFieldsValue({ 
      parentId: classify.id,
      parentName: classify.name
    })
  }

  const modalFooter = done 
    ? {
      footer: null,
      onCancel: onDone
    }
    : {
      okText: '保存',
      onOk: handleSubmit,
      onCancel,
    }
  
  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          extra={
            <Button type="primary" onClick={onDone}> 知道了</Button>
          }
          className={styles.formResult}
        />
      )
    }

    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="sort"
          label="排序"
          rules={[
            {
              required: true,
              message: '请输入排序',
            },
          ]}
        >
          <InputNumber placeholder="请输入" />
        </Form.Item>
        {
          !current 
          ?
          <Form.Item
            name="parentName"
            label="一级分类"
            rules={[
              {
                required: true,
                message: '请选择一级分类',
              },
            ]}
          >
            <Select
              placeholder="请选择"
              allowClear
              onChange={handleFirstLevel}
            >
              {
                firstLevelList.map(classify => 
                  <Select.Option value={JSON.stringify(classify)} key={classify.id}>{classify.name}</Select.Option>
                )
              }
            </Select>
          </Form.Item>
          : null
        }
        <Form.Item
          name="status"
          label="状态"
          rules={[
            {
              required: true,
              message: '请选择状态',
            },
          ]}
        >
          <Radio.Group placeholder="请选择">
            <Radio value={false}>禁用</Radio>
            <Radio value={true}>启用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="name"
          label="分类名称"
          rules={[
            {
              required: true,
              message: '请输入分类名称',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    )
  }
    
  return (
    <Modal
      forceRender
      title={done ? null : `${current ? '编辑': '添加'}分类` }
      class={styles.standardListForm}
      width={640}
      bodyStyle={
        done
          ? {
              padding: '72px 0'
            }
          : {
              padding: '28px 0 0'
          }
      }
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      { getModalContent() }
    </Modal>
  )
  
}

export default OperationModal
