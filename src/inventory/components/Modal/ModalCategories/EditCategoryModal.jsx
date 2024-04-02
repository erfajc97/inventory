import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CustomModal from "../../../../UI/CustomComponentsAntD/CustomModal";
import { editCategoryThunk } from "../../../../../store/inventory/thunks";

const EditCategoryModal = ({ category, onCancel, isOpenModal }) => {
  const [loading, setLoading] = useState(false);
  const { Item } = Form;
  const dispatch = useDispatch();

  const [formAdd] = Form.useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const newCategory = await data;
    await dispatch(editCategoryThunk(category?.id, newCategory));
    formAdd.resetFields();
    onCancel();
    setLoading(false);
  };

  formAdd.setFieldsValue({
    name: category?.name || "",
    description: category?.description || "",
  });

  return (
    <CustomModal onCancel={onCancel} destroyOnClose isOpenModal={isOpenModal}>
      <Row justify="center">
        <h3> EDITAR CATEGORÍA </h3>
      </Row>
      <div>
        <Form
          className="standard-form"
          disabled={loading}
          layout="vertical"
          form={formAdd}
          name="formulario"
          initialValues={initialData}
          onFinish={onSubmit}
        >
          <div style={{ width: "100%" }}>
            <Col>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "14px",
                  color: "#676767",
                }}
              >
                Nombre de la categoria
              </p>
              <Item
                style={{ marginBottom: "0" }}
                name="name"
                rules={[
                  { required: true, message: "Por favor llenar el campo" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value.trim() === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "El nombre no debe contener espacios al principio o al final"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input
                  style={{
                    fontSize: "14px",
                    borderRadius: "5px",
                    background: "#F6F6F6",
                  }}
                  placeholder="Herramientas"
                />
              </Item>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "14px",
                  color: "#676767",
                }}
              >
                Descripción
              </p>
              <Item
                style={{
                  marginBottom: "0",
                  fontSize: "14px",
                  borderRadius: "5px",
                }}
                name="description"
              >
                <Input
                  style={{ fontSize: "14px", background: "#F6F6F6" }}
                  placeholder="Para herramientas eléctricas"
                />
              </Item>
            </Col>
          </div>
          <Row justify="center">
            <Item style={{ marginTop: "2rem" }}>
              <Button
                loading={loading}
                shape="round"
                className="btn-standard-green"
                htmlType="submit"
              >
                <span>GUARDAR</span>
              </Button>
            </Item>
          </Row>
        </Form>
      </div>
    </CustomModal>
  );
};

const initialData = {
  name: "",
  description: "",
};

export default EditCategoryModal;
