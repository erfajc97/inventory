// hooks/useInventoryOption.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useSupplyDelete from "./suppliesHooks/useSupplyDelete";
import useSelectSupplyUpdate from "./suppliesHooks/useSelectSupplyUpdate";
import useEquipmentDelete from "./equipmentHooks/useEquipmentDelete";
import useSelectEquipmentUpdate from "./equipmentHooks/useSelectEquipmentUpdate";
import { getAllCategoriesThunk } from "../../../store/inventory/thunks";

const useInventoryOption = (inventory) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [editData, setEditData] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategoryInventory();
  }, []);

  const getCategoryInventory = async () => {
    setLoading(true);
    await dispatch(getAllCategoriesThunk());
    setLoading(false);
  };

  const { editSupply, isOpenModalEditSupply, onCancelEditSupply } =
    useSelectSupplyUpdate();
  const { isOpenModalEditEquipment, onCancelEditEquipment, editEquipment } =
    useSelectEquipmentUpdate();
  const {
    deleteSupply,
    isOpenModalDeleteSupply,
    onCancelSupplyDelete,
    validationDeleteSupply,
  } = useSupplyDelete(null);
  const {
    deleteEquipment,
    isOpenModalDeleteEquipment,
    onCancelDeleteEquipment,
    validationDeleteEquipment,
  } = useEquipmentDelete();

  useEffect(() => {
    if (inventory.title === "INSUMO") {
      setModal(true);
    } else {
      setModal(false);
    }
  }, []);

  const dataEditSupply = (data) => {
    editSupply();
    setEditData(data);
  };

  const dataEditEquipment = (data) => {
    editEquipment();
    setEditData(data);
  };

  const toggleCategory = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(
        expandedCategories.filter((cat) => cat !== category)
      );
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  return {
    expandedCategories,
    editData,
    modal,
    isOpenModalEditSupply,
    onCancelEditSupply,
    isOpenModalEditEquipment,
    onCancelEditEquipment,
    deleteSupply,
    isOpenModalDeleteSupply,
    onCancelSupplyDelete,
    validationDeleteSupply,
    deleteEquipment,
    isOpenModalDeleteEquipment,
    onCancelDeleteEquipment,
    validationDeleteEquipment,
    dataEditSupply,
    dataEditEquipment,
    toggleCategory,
    loading,
  };
};

export default useInventoryOption;
