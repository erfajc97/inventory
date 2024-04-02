import { useEffect, useState } from "react";
import { Button, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ModalAddCategory from "./ModalCategories/ModalAddCategory";
import EditCategoryModal from "./ModalCategories/EditCategoryModal";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";
import { deleteCategoryThunk, getAllCategoriesThunk } from "../../../../store/inventory/thunks";
import verifyResponse from "../../../helpers/verifyResponse";
import EditIcon from "../../../assets/EditIcon";

const CategoryInventory = ({ errorMessage, setErrorMessage }) => {
  const { isOpenModal, handleOpenCloseModal } = useOpenCloseModal();
  const [OpenEdit, setOpenEdit] = useState(false);
  const [category, setCategory] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.inventoryCategories);
  const handleClose = () => setOpenEdit((state) => !state);
  const onDelete = async (id) => {
    const response = await dispatch(deleteCategoryThunk(id));
    if (response.success) {
      verifyResponse(
        response.data,
        response.status,
        "Categoria eliminada con exito"
      );
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  const onEditCategory = (categorySelected) => {
    setOpenEdit(true);
    setCategory(categorySelected);
  };

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>EDITAR CATEGORIAS</h3>
      <div>
        <div style={{ height: "15rem", overflow: "auto", marginBlock: "1rem" }}>
          {categories?.map((category) => (
            <Row
              justify="space-between"
              align="middle"
              key={category?.id}
              style={{
                border: "1px solid #BFBFBF",
                borderRadius: "20px",
                padding: "0 2rem",
                marginBottom: "0.8rem",
              }}
            >
              <p style={{ paddingTop: "1rem", fontSize: "14px" }}>
                {category?.name}
              </p>
              <Row>
                <Button
                  type="ghost"
                  style={{ border: "none" }}
                  onClick={() => onEditCategory(category)}
                >
                  <EditIcon color="#50A684" width="27px" />
                </Button>
                <Button
                  type="ghost"
                  style={{ marginLeft: "0.5rem", border: "none" }}
                  icon={<DeleteOutlined style={{ fontSize: "19px" }} />}
                  danger
                  onClick={() => onDelete(category?.id)}
                />
              </Row>
            </Row>
          ))}
        </div>
        <hr style={{ marginBlock: "1rem" }} />
        <Row onClick={handleOpenCloseModal} justify="center">
          <Button
            style={{
              border: "0.1px solid #BFBFBF",
              fontSize: "14px",
              marginBlock: "1rem",
              paddingInline: "20%",
              height: "3rem",
            }}
            shape="round"
          >
            Agregar nueva categoria
            <PlusOutlined 
              style={{
                border: " 1px solid #000",
                borderRadius: "100%",
                padding: "0.25rem 0.3rem",
              }}
            />
          </Button>
        </Row>

        {errorMessage && (
          <p
            style={{
              fontSize: "14px",
              borderRadius: "17px",
              padding: "1rem",
              color: "#6F5151",
              background: "#FADADA",
              marginTop: "5rem",
            }}
          >
            Para poder eliminar una categoría, primero deberás eliminar los
            insumos o equipos que contenga
          </p>
        )}
      </div>
      <ModalAddCategory
        onCancel={handleOpenCloseModal}
        isOpenModal={isOpenModal}
      />
      <EditCategoryModal
        category={category}
        onCancel={handleClose}
        isOpenModal={OpenEdit}
      />
    </div>
  );
};

export default CategoryInventory;
