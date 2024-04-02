import { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import { CustomNavigate } from "../UI/CustomComponentsAntD/CustomNavigate";
import EditIcon from "../assets/EditIcon";
import { Spin } from 'antd'
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

import CategoryDrawer from "./UI/CategoryDrawer";
import { getAllCategoriesThunk, setInventoryThunk } from "../../store/inventory/thunks";
import InventoryOptions from './components/InventoryOptions';

const InventoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleOpenCloseDrawer = () => {
    setOpenDrawer((state) => !state);
    setErrorMessage(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getAllDataInventory();
  }, [dispatch]);

  const getAllDataInventory = async () => {
    setLoading(true);
    await dispatch(setInventoryThunk());
    await dispatch(getAllCategoriesThunk());
    setLoading(false);
  };

  const inventories = useSelector((state) => state?.inventory);
  const filteredInventories = inventories.slice(0, inventories.length - 1);
  const out_of_stock = inventories[inventories.length - 1];

//   if (loading) return <Spin size="large" />;

  return (
    <div className="section-wrapper">
      <CustomNavigate title={
        <span /*style={{ paddingTop: "3px", color: "#10B48C" }}*/>
          ADMINISTRACIÓN DE INVENTARIO
        </span>}
      >
        <Button
          className="btn-standard-green"
          type="button"
          shape="round"
          onClick={handleOpenCloseDrawer}
        >
          <Row justify="center" align="middle" gutter={6}>
            <Col>
              <EditIcon width="20px" />
            </Col>

            <Col>
              <span>ADMINISTRAR SUBCATEGORÍAS</span>
            </Col>
          </Row>
        </Button>
      </CustomNavigate>
      <Row gutter={[28, 28]}>
        {filteredInventories.map((inventory, index) => (
          <Col key={index} xs={24} sm={12}>
            <InventoryOptions outStock={out_of_stock} inventory={inventory} />
          </Col>
        ))}
      </Row>

      <CategoryDrawer
        openDrawer={openDrawer}
        closeDrawer={handleOpenCloseDrawer}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default InventoryPage;
