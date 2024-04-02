import { Form, Input, Button, Select, Checkbox, Row } from "antd";
import useUpdateErrosSupply from './../../../hooks/suppliesHooks/useUpdateErrosSupply';
import CustomModal from "../../../../UI/CustomComponentsAntD/CustomModal";

const ModalEditSupply = ({ data, closeEdit, isOpenModal }) => {
  const id = data?.id;

  const { form, categories, loading, onSubmitEdit } = useUpdateErrosSupply({
    id,
    closeEdit,
  });
  const { Item } = Form;
  const { Option } = Select;

  form.setFieldsValue({
    name: data?.name || "",
    stock: data?.stock || "",
    unit_price: data?.price || "",
    low_stock_alarm: data?.lowStockAlarm || false,
    subcategory_id: data?.subCategoryId || undefined,
  });

  return (
    <CustomModal onCancel={closeEdit} destroyOnClose isOpenModal={isOpenModal}>
      <Row justify="center">
        <h3> EDITAR INSUMO </h3>
      </Row>
      <Form
        className="standard-form"
        layout="vertical"
        form={form}
        name="formulario"
        onFinish={onSubmitEdit}
        disabled={loading}
      >
        <label style={{ color: "#676767", fontSize: "12px" }}>
          NOMBRE DEL INSUMO
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
          COSTE POR UNIDAD
        </label>
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
                  new Error("Este campo debe ser un valor con dos decimales")
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
            minLength={3}
            maxLength={10}
          />
        </Item>
        <label style={{ color: "#676767", fontSize: "12px" }}>
          DISPONIBILIDAD
        </label>
        <Item
          name="stock"
          rules={[
            { required: true, message: "Por favor llenar el campo" },
            {
              pattern: /^[0-9]+$/,
              message: "Este campo debe ser un número entero",
            },
          ]}
        >
          <Input
            style={{
              fontSize: "14px",
              borderRadius: "5px",
              background: "#F6F6F6",
            }}
            minLength={1}
            maxLength={7}
          />
        </Item>
        <Item name="low_stock_alarm" valuePropName="checked">
          <Checkbox
            style={{ marginTop: "1rem", width: "100%" }}
            onChange={(e) => {
              form.setFieldsValue({ low_stock_alarm: e.target.checked });
            }}
          >
            Alarma con menos del 20%
          </Checkbox>
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

export default ModalEditSupply;
