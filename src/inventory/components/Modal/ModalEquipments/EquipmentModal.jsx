import { Form, Input, Button, Select, Row } from "antd";
import useAddErrosEquipment from './../../../hooks/equipmentHooks/useAddErrosEquipment';
import CustomModal from "../../../../UI/CustomComponentsAntD/CustomModal";

const EquipmentModal = ({ close, isOpenModal }) => {
  const { form, categories, onSubmit, loading } = useAddErrosEquipment(close);
  const { Item } = Form;
  const { Option } = Select;

  return (
    <CustomModal onCancel={close} isOpenModal={isOpenModal}>
      <Row justify="center">
        <h3> AGREGAR EQUIPO </h3>
      </Row>
      <Form
        className="standard-form"
        layout="vertical"
        form={form}
        disabled={loading}
        name="formulario"
        onFinish={onSubmit}
      >
        <label style={{ color: "#676767", fontSize: "12px" }}>
          NOMBRE DEL EQUIPO
        </label>
        <Item
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
            placeholder="Aceite para tuercas"
          />
        </Item>
        <label style={{ color: "#676767", fontSize: "12px" }}>CATEGORIA</label>
        <Item
          name="subcategory_id"
          rules={[
            {
              required: true,
              message: "Por favor seleccionar una subcategoría",
            },
          ]}
        >
          <Select>
            {categories?.map((category, i) => (
              <Option value={category?.id} key={i}>
                {category?.name}
              </Option>
            ))}
          </Select>
        </Item>
        <label style={{ color: "#676767", fontSize: "12px" }}>
          DISPONIBILIDAD
        </label>
        <Item
          name="stock"
          rules={[
            { required: true, message: "Por favor llenar el campo" },
            {
              pattern: /^\d+$/,
              message: "Este campo debe ser un número entero",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || value.trim() === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "El campo no debe contener espacios al principio o al final"
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
            minLength={1}
            maxLength={8}
            placeholder="00"
          />
        </Item>
        <label style={{ color: "#676767", fontSize: "12px" }}>PRECIO</label>
        <Item
          name="unit_price"
          rules={[
            { required: true, message: "Por favor llenar el campo" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || /^\d+\.\d{2}$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Este campo debe ser un valor flotante con dos decimales"
                  )
                );
              },
            }),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || value.trim() === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "El campo no debe contener espacios al principio o al final"
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
            minLength={1}
            maxLength={8}
            placeholder="00.00"
          />
        </Item>
        <label style={{ color: "#676767", fontSize: "12px" }}>
          CANTIDAD MAXIMA AUTORIZADA
        </label>
        <Item
          name="units_per_employee"
          rules={[
            { required: true, message: "Por favor llenar el campo" },
            {
              pattern: /^\d+$/,
              message: "Este campo debe ser un número entero",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || value.trim() === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "El campo no debe contener espacios al principio o al final"
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
            minLength={1}
            maxLength={3}
            placeholder="00"
          />
        </Item>
        <Row justify="center">
          <Item>
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
    </CustomModal>
  );
};

export default EquipmentModal;
