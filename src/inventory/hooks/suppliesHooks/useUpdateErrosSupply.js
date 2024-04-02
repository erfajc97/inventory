import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editSuppliesThunk } from "../../../../store/inventory/thunks";

const useUpdateErrosSupply = ({ id, closeEdit }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.inventoryCategories);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onSubmitEdit = async (values) => {
    // Realiza las validaciones personalizadas aquí
    setLoading(true);
    const errors = {};

    // Validación de nombre sin espacios en blanco al principio o al final
    if (typeof values.name === "string" && values.name.trim() !== values.name) {
      errors.name =
        "El nombre no debe contener espacios al principio o al final";
    }

    // Conversión de valores a números enteros (si son cadenas)
    const numericFields = ["stock"];
    numericFields.forEach((field) => {
      if (typeof values[field] === "string") {
        values[field] = parseInt(values[field], 10); // Convierte a número entero
      }
      if (isNaN(values[field])) {
        errors[field] = "Este campo debe ser un número entero";
      }
    });

    // Validación de unit_price como valor flotante con dos decimales
    if (
      typeof values.unit_price === "string" &&
      (isNaN(values.unit_price) || !/^\d+(\.\d{2})?$/.test(values.unit_price))
    ) {
      errors.unit_price =
        "Este campo debe ser un valor flotante con dos decimales";
    }

    // Validación de espacios en blanco al principio o al final en todos los campos
    const fieldsWithWhitespace = [
      "name",
      "stock",
      "unit_price",
      "low_stock_alarm",
      "subcategory_id",
    ];
    fieldsWithWhitespace.forEach((field) => {
      if (
        typeof values[field] === "string" &&
        values[field].trim() !== values[field]
      ) {
        errors[field] = "No debe haber espacios al principio o al final";
      }
    });

    if (Object.keys(errors).length > 0) {
      form.setFields({
        ...errors,
      });
    } else {
      const valuesFromForm = form.getFieldsValue();
      const supply = {
        ...valuesFromForm,
        low_stock_alarm: values?.low_stock_alarm,
      };
      const response = await dispatch(editSuppliesThunk(id, supply));
      setLoading(false);
      form.resetFields();
      if (response.success) closeEdit();
    }
  };

  return { form, categories, onSubmitEdit, loading };
};

export default useUpdateErrosSupply;
