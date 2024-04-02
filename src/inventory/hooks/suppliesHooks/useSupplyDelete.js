import { useState } from "react";
import { useDispatch } from "react-redux";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";
import { deleteSuppliesThunk } from "../../../../store/inventory/thunks";

const useSupplyDelete = () => {
  const { isOpenModal, handleOpenCloseModal } = useOpenCloseModal();
  const [idDelete, setIdDelete] = useState({});
  const isOpenModalDeleteSupply = isOpenModal;
  const onCancelSupplyDelete = () => {
    handleOpenCloseModal();
  };

  const dispatch = useDispatch();

  const deleteSupply = (id) => {
    handleOpenCloseModal();
    setIdDelete(id);
  };

  const validationDeleteSupply = async () => {
    await dispatch(deleteSuppliesThunk(idDelete));
    handleOpenCloseModal();
  };
  return {
    isOpenModalDeleteSupply,
    onCancelSupplyDelete,
    deleteSupply,
    validationDeleteSupply,
  };
};

export default useSupplyDelete;
