import { Button, Col, Form, Row, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomModal from "../../../../UI/CustomComponentsAntD/CustomModal";
import { addNewCategory } from "../../../../../store/inventory/thunks";

const ModalAddCategory = ({ onCancel, isOpenModal }) => {
  const [loading, setLoading] = useState(false);
  const { Item } = Form;
  const dispatch = useDispatch();

  const [formAdd] = Form.useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const newCategory = await data;
    await dispatch(addNewCategory(newCategory));
    formAdd.resetFields();
    onCancel();
    setLoading(false);
  };
  return (
    <CustomModal onCancel={onCancel} isOpenModal={isOpenModal}>
      <Row justify="center">
        <h3> Agregar Categoría </h3>
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
                }}
                name="description"
              >
                <Input
                  style={{
                    fontSize: "14px",
                    borderRadius: "5px",
                    background: "#F6F6F6",
                  }}
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
export default ModalAddCategory;
