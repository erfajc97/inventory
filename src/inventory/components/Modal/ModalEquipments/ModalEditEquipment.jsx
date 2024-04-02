import { Form, Input, Button, Select, Row } from "antd";;
import useUpdateErrosEquipment from './../../../hooks/equipmentHooks/useUpdateErrosEquipment';
import CustomModal from "../../../../UI/CustomComponentsAntD/CustomModal";

const ModalEditEquipment = ({ data, closeEdit, isOpenModal }) => {
  const id = data?.id;
  const { form, categories, onSubmitEdit, loading } = useUpdateErrosEquipment({
    id,
    closeEdit,
  });
  const { Item } = Form;
  const { Option } = Select;

  form.setFieldsValue({
    name: data?.name || "",
    stock: data?.stock || "",
    unit_price: data?.price || "",
    units_per_employee: data?.unitsPerEmployee || "",
    subcategory_id: data?.subCategoryId || undefined,
  });

  return (
    <CustomModal onCancel={closeEdit} destroyOnClose isOpenModal={isOpenModal}>
      <Row justify="center">
        <h3> EDITAR EQUIPO </h3>
      </Row>
      <Form
        className="standard-form"
        layout="vertical"
        form={form}
        name="formulario"
        disabled={loading}
        onFinish={onSubmitEdit}
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
        <label style={{ color: "#676767", fontSize: "12px" }}>PRECIO</label>
        <Item
          name="unit_price"
          rules={[
            { required: true, message: "Por favor llenar el campo" },
            {
              pattern: /^\d+(\.\d{2})?$/,
              message:
                "Este campo debe ser un valor flotante con dos decimales",
            },
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

export default ModalEditEquipment;
