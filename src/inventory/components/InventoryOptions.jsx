import { Button, Input, Form } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import EquipmentModal from "./Modal/ModalEquipments/EquipmentModal";
import InventoryOption from "./InventoryOption";
import { useState, useEffect } from "react";
import SuppliesModal from "./Modal/ModalSupplies/SuppliesModal";
import { useDispatch } from "react-redux";
import useOpenCloseModal from "../../hooks/useOpenCloseModal";
import { setInventoryThunk } from "../../../store/inventory/thunks";

const InventoryOptions = ({ inventory, outStock }) => {
  const { isOpenModal, handleOpenCloseModal } = useOpenCloseModal();
  const [modal, setModal] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [form] = Form.useForm();
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (inventory.title === "INSUMO") {
      setModal(true);
      setType("supplies");
      return;
    }

    setModal(false);
    setType("equipments");
  }, [inventory.title]);

  useEffect(() => {
    dispatch(setInventoryThunk(searchWord, type));
  }, [searchWord]);

  const outStockArray = Object.values(outStock);

  const categories = Object.keys(inventory);

  return (
    <div className="inventory_container">
      <div className="inventory_title_container">
        <h3 className="inventory_title"> {inventory.title} </h3>
      </div>
      {categories.length && (
        <Form className="searchBar_container" form={form}>
          <Input
            style={{ fontSize: "1rem" }}
            className="search"
            placeholder="Buscar"
            onChange={(e) => setSearchWord(e.target.value)}
          />

          <div
            style={{
              borderRadius: "0 20px 20px 0",
              padding: "0.5rem",
              border: "0.1px  solid #75757570",
              borderLeft: "none",
              cursor: "pointer",
            }}
          >
            <SearchOutlined style={{ fontSize: "1rem" }} />
          </div>
        </Form>
      )}

      <div className="inventory_list_container">
        <div className="inventory_list">
          {/* {modal && (
            <div>
              {outStockArray.length > 0 && (
                <div>
                  <h2 style={{ color: "red" }}>Insumos faltantes</h2>
                  {outStockArray.map((item, index) => (
                    <div key={index}>
                      <p style={{ color: "red" }}>{item.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )} */}
          <InventoryOption inventory={inventory} />
        </div>
      </div>

      <div className="container_btn-add-product">
        <Button
          onClick={handleOpenCloseModal}
          className="btn-add-product"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </div>

      {modal ? (
        <SuppliesModal isOpenModal={isOpenModal} close={handleOpenCloseModal} />
      ) : (
        <EquipmentModal
          isOpenModal={isOpenModal}
          close={handleOpenCloseModal}
        />
      )}
    </div>
  );
};

export default InventoryOptions;
