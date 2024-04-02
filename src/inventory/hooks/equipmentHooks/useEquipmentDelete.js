import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEquipmentsThunk } from "../../../../store/inventory/thunks";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";

const useEquipmentDelete = () => {
  const { isOpenModal, handleOpenCloseModal } = useOpenCloseModal();
  const [idDelete, setIdDelete] = useState({});
  const isOpenModalDeleteEquipment = isOpenModal;
  const onCancelDeleteEquipment = () => {
    handleOpenCloseModal();
  };

  const dispatch = useDispatch();

  const deleteEquipment = (id) => {
    handleOpenCloseModal();
    setIdDelete(id);
  };

  const validationDeleteEquipment = async () => {
    await dispatch(deleteEquipmentsThunk(idDelete));
    handleOpenCloseModal();
  };
  return {
    isOpenModalDeleteEquipment,
    onCancelDeleteEquipment,
    deleteEquipment,
    validationDeleteEquipment,
  };
};

export default useEquipmentDelete;
